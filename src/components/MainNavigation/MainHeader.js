import React from 'react'

const MainHeader = (props) => (
  <header style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
    {props.children}
  </header>
)

export default MainHeader

