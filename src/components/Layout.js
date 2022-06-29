import React from 'react'
import { useAuth } from '../state'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import MainNavigation from './MainNavigation/MainNavigation'

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

