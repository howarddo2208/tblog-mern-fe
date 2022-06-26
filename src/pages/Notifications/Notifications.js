import React, { useEffect, useState } from 'react'
import Notification from '../../components/Notification/Notification'
import { useHttpClient } from '../../hooks/useHttpClient'
import './Notifications.css'
import ErrorModal from '../../components/Modal/ErrorModal'
import SkeletonPostList from '../../components/Skeleton/SkeletonPostList'
import { useAuth } from '../../stateManagements'

const Notifications = ({ user, userFollowStats }) => {
  const { currentUser } = useAuth()
  const [notifications, setNotifications] = useState([])
  const { isLoading, sendReq, error, clearError } = useHttpClient()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${currentUser.userId}/notifications`,
          'GET',
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        )
        setNotifications(responseData.notifications)
      } catch (err) {}
    }
    fetchNotifications()
  }, [sendReq, currentUser.userId, currentUser])

  // useEffect(() => {
  //   if (currentUser && currentUser.userId !== userId) {
  //     history.push('/');
  //   }
  // }, [history, currentUser, userId]);

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container container-notif-page">
        {isLoading ? (
          <SkeletonPostList type="mini" />
        ) : (
          <>
            <h3 className="notif__heading">Notifications</h3>
            <div className="notifications">
              {notifications && notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    user={user}
                    notification={notification}
                  />
                ))
              ) : (
                <p>No notifications found!</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Notifications

