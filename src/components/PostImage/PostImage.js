import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAIModels } from '../../stateManagements'

export const PostImage = (props) => {
  const { nsfw } = useAIModels()
  const imgRef = useRef()

  const predict = async () => {
    if (nsfw) {
      const predictions = await nsfw.classify(imgRef.current)
    }
  }

  // useEffect(() => {
  //   predict()
  // }, [nsfw])
  if (props.link) {
    return (
      <div className={`preview__image ${props.className}`}>
        <Link to={props.link}>
          <img src={props.src} alt={props.alt} ref={imgRef} />
        </Link>
      </div>
    )
  }
  return (
    <div className={`post__image ${props.className}`}>
      <img src={props.src} alt={props.alt} ref={imgRef} />
    </div>
  )
}

