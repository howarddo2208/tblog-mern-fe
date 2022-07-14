import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAIModels } from '../../state'
import { sendClassifyPost } from '../../utils/classifyAPI'
import { imageIsExplicit } from '../../utils/detect'

export const PostImage = (props) => {
  const { imgClassified, imgToxic, postId } = props
  const [isHidden, setIsHidden] = useState(imgToxic)
  const imgRef = useRef(null)
  const { nsfw } = useAIModels()

  const unBlur = () => {
    setIsHidden(false)
  }

  const classifyImg = async (nsfw, imgRef) => {
    const predictions = await nsfw.classify(imgRef.current)
    const isExplicit = imageIsExplicit(predictions)
    sendClassifyPost(postId, isExplicit, 'img')
    return isExplicit
  }

  useEffect(() => {
    if (nsfw && imgRef.current && !imgClassified) {
      classifyImg(nsfw, imgRef).then((isExplicit) => {
        setIsHidden(!isExplicit)
      })
    }
  }, [nsfw, imgRef, imgClassified])

  return (
    <div className={`preview__image ${props.className}`} onClick={unBlur}>
      {(props.link && !isHidden) ? (
        <Link to={props.link}>
          <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} style={
            isHidden ? { filter: 'blur(30px)', WebkitFilter: 'blur(30px)' } : {}
          } />
        </Link>
      ) : (
        <img crossOrigin='anonymous' src={props.src} alt={props.alt} ref={imgRef} style={
          isHidden ? { filter: 'blur(30px)', WebkitFilter: 'blur(30px)', cursor: 'pointer' } : {}
        } />
      )}

      {isHidden && <h1 style={{
        position: 'absolute', top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
        cursor: 'pointer'
      }}>
        This content is explicit, click to view
      </h1>}
    </div>
  )
}

