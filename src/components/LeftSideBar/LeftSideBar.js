import { FaTags } from '@react-icons/all-files/fa/FaTags'
import { FaFacebookMessenger } from '@react-icons/all-files/fa/FaFacebookMessenger'
import { FcHome } from '@react-icons/all-files/fc/FcHome'
import { FcReading } from '@react-icons/all-files/fc/FcReading'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../state'
import './LeftSideBar.css'

const LeftSideBar = () => {
  const auth = useAuth()
  const { currentUser } = auth
  const currentUserId = currentUser && currentUser.userId

  return (
    <>
      <div style={{ backgroundColor: 'white', borderRadius: 10 }}>
        <React.Fragment>
          <ul className="sidebar__list">
            <li className="list__item hvr-bg-lt">
              <NavLink to="/" exact>
                <i>
                  <FcHome />
                </i>
                <span>Home</span>
              </NavLink>
            </li>
            {currentUserId && (
              <li className="list__item hvr-bg-lt">
                <NavLink to={`/users/${currentUserId}/readinglist`} exact>
                  <i>
                    <FcReading />
                  </i>
                  Reading List
                </NavLink>
              </li>
            )}
            <li className="list__item hvr-bg-lt">
              <NavLink to="/tags" exact>
                <i>
                  <FaTags />
                </i>
                Tags
              </NavLink>
            </li>
            <li className="list__item hvr-bg-lt">
              <NavLink to="/chat" exact>
                <i>
                  <FaFacebookMessenger />
                </i>
                Chat
              </NavLink>
            </li>
          </ul>
          <div className="sidebar-tags">
            {currentUser && currentUser.tags && currentUser.tags.length > 0 && (
              <>
                <h3>My Tags</h3>
                <ul className="sidebar-tags-list">
                  {currentUser.tags.map((tag, i) => (
                    <li key={i} className="list__item hvr-bg-lt">
                      <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </React.Fragment>
      </div>
    </>
  )
}

export default LeftSideBar

