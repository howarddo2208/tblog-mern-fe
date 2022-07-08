import React, { useEffect, useState } from 'react'
import { FaDev } from '@react-icons/all-files/fa/FaDev'
import NavLinks from '../NavLinks/NavLinks'
import './Nav.css'
import SideDrawer from '../SideDrawer/SideDrawer'
import { useHttpClient } from '../../../hooks/useHttpClient'
import { NavLink } from 'react-router-dom'
import { useAuth, useSocket } from '../../../state'

const Nav = ({ children, onSearchIconClick }) => {
  const { currentUser } = useAuth()
  const { socket } = useSocket()

  let userId
  if (currentUser) {
    userId = currentUser.userId
  }

  const { sendReq } = useHttpClient()
  const [unreadNotifications, setUnreadNotifications] = useState([])

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const openDrawerHandler = () => {
    setDrawerIsOpen(true)
  }

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false)
  }

  useEffect(() => {
    if (userId) {
      const fetchUnreadNotifications = async () => {
        try {
          const responseData = await sendReq(
            `${process.env.REACT_APP_BASE_URL}/users/${userId}/notifications/unread`,
            'GET',
            null,
            {
              Authorization: `Bearer ${currentUser.token}`,
            }
          )
          setUnreadNotifications(responseData.notifications)
        } catch (err) { }
      }
      fetchUnreadNotifications()
    }
  }, [sendReq, userId, currentUser])

  useEffect(() => {
    if (socket) {
      socket.on('notificationReceived', (data) => {
        console.log('there is noti')
        setUnreadNotifications((unreadNotifications) => {
          return [...unreadNotifications, data]
        })
      })
    }
  }, [socket])

  return (
    <div className="container container-nav">
      {drawerIsOpen && (
        <SideDrawer onClose={closeDrawerHandler} onClick={closeDrawerHandler} />
      )}

      <div className="header__hamburger-menu" onClick={openDrawerHandler}></div>
      <div className="header__logo-search">
        <NavLink to="/" className="header__logo">
          <h2>TBLOG</h2>
        </NavLink>
        {children}
      </div>
      <nav className="nav">
        <NavLinks
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          onSearchIconClick={onSearchIconClick}
        />
      </nav>
    </div >
  )
}

export default Nav

