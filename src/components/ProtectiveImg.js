import React from 'react'

function ProtectiveImg(props) {
  return (
    <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} />
  )
}

export default ProtectiveImg