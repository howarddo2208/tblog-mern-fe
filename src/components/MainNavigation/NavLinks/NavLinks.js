import { FiSearch } from '@react-icons/all-files/fi/FiSearch'
import React from 'react'
import { useAuth } from '../../../stateManagements'
import { GuestNavLinks } from './GuestNavLinks'
import { LoggedInNavLinks } from './LoggedInNavLinks'

const NavLinks = ({
  onSearchIconClick,
  unreadNotifications,
  setUnreadNotifications,
}) => {
  const { isLoggedIn, currentUser, logout } = useAuth()

  const handleSearchClick = () => {
    onSearchIconClick()
  }

  return (
    <ul className="nav__list">
      <li>
        <i className="search-icon">
          <FiSearch size="2.5rem" onClick={handleSearchClick} />
        </i>
      </li>

      {isLoggedIn ? (
        <LoggedInNavLinks
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          currentUser={currentUser}
          logout={logout}
        />
      ) : (
        <GuestNavLinks loginFirst={true} />
      )}
    </ul>
  )
}

export default NavLinks

