import React from 'react'
import { useAuth } from '../stateManagements'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import MainNavigation from './MainNavigation/MainNavigation'
import RightSideBar from './RightSideBar/RightSideBar'

const Layout = ({ children }) => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      <MainNavigation />
      <div className="container-layout">
        <div className="container-sidebar">
          <LeftSideBar />
        </div>
        {children}
        {/* {isLoggedIn && suggestions && (
          <RightSideBar tags={[]} isLoading={false} />
        )} */}
      </div>
    </>
  )
}

export default Layout

