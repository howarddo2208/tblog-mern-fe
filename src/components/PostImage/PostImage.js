import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAIModels } from '../../state'
import { imageIsExplicit } from '../../utils/detect'
import ProtectiveImg from '../ProtectiveImg'

export const PostImage = (props) => {
  console.log('render image')
  const { nsfw } = useAIModels()
  const imgRef = useRef(null)
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

  const unBlur = () => {
    if (isExplicit && imgRef.current) {
      setIsExplicit(false)
    }
  }

  return (
    <div className={`preview__image ${props.className}`} onClick={unBlur}>
      {(props.link && !isExplicit) ? (
        <Link to={props.link}>
          <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} style={
            isExplicit ? { filter: 'blur(30px)', WebkitFilter: 'blur(30px)' } : {}
          } />
        </Link>
      ) : (
        <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} style={
          isExplicit ? { filter: 'blur(30px)', WebkitFilter: 'blur(30px)' } : {}
        } />
      )}

      {isExplicit && <h1 style={{
        position: 'absolute', top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        This content is explicit, click to view
      </h1>}
    </div>
  )
}

