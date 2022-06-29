import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAIModels } from '../../state'
import { imageIsExplicit } from '../../utils/detect'

export const PostImage = (props) => {
  const { nsfw } = useAIModels()
  const imgRef = useRef()
  const [isExplicit, setIsExplicit] = useState(false)

  const predict = async () => {
    if (nsfw && imgRef.current) {
      try {
        const predictions = await nsfw.classify(imgRef.current)
        if (imageIsExplicit(predictions)) {
          setIsExplicit(true)
        }
      } catch (err) {
        console.log('err', err)
      }
    }
  }

  useEffect(() => {
    predict()
  }, [nsfw, imgRef])

  return (
    <div className={`preview__image ${props.className}`} style={
      isExplicit ? { filter: 'blur(20px)', WebkitFilter: 'blur(30px)' } : {}
    }>
      {(props.link) ? (
        <Link to={props.link}>
          <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} />
        </Link>
      ) : (
        <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} />
      )}
    </div>
  )
}

