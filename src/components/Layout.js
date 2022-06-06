import React from 'react'
import Footer from './Footer/Footer'
import LeftSideBar from './LeftSideBar/LeftSideBar'
import MainNavigation from './MainNavigation/MainNavigation'
import RightSideBar from './RightSideBar/RightSideBar'

const Layout = ({ children, isAuth, suggestions }) => {
  return (
    <>
      <MainNavigation />
      {!isAuth ? (
        <div className="container-layout">
          <div className="container-sidebar">
            <LeftSideBar />
          </div>
          {children}
          {suggestions && <RightSideBar tags={[]} isLoading={false} />}
        </div>
      ) : (
        children
      )}
      <Footer />
    </>
  )
}

export default Layout
