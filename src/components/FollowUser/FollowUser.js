import React, { useEffect, useState } from 'react'
import useHttpClient from '../../hooks/useHttpClient'
import { useAuth, useSocket } from '../../stateManagements'
import { checkInArray } from '../../utils'
import './FollowUser.css'

export const FollowUser = ({
  followId,
  setShowModal,
  followers,
  userToFollow,
}) => {
  const socket = useSocket((state) => state.socket)
  const { userId, currentUser } = useAuth()
  const { sendReq } = useHttpClient()

  const [following, setFollowing] = useState(false)

  useEffect(() => {
    setFollowing(checkInArray(followers, userId))
  }, [followers, userId])

  const handleFollow = () => {
    !userId ? setShowModal(true) : followUser(followId)
  }

  const followUser = async (followId) => {
    let action = following ? 'unfollow' : 'follow'
    setFollowing((following) => !following)
    if (action === 'follow') {
      socket.emit('follow', {
        sender: currentUser,
        receiver: userToFollow,
      })
    }
    const reqData = { userId: userId, followId }
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${action}`,
        'PUT',
        JSON.stringify(reqData),
        {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        }
      )
      //redirect user to the landing page
    } catch (err) {}
  }
  return (
    <button
      className={`btn--profile-cta ${following ? 'btn-following' : ''}`}
      onClick={handleFollow}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

