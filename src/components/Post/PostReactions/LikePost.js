import React from 'react'
import { useAuth } from '../../../state'
import { LikeIcon } from '../../Icons/Icons'

export const LikePost = ({ likes, handleReaction, isLiked, setShowModal }) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.userId
  const action = isLiked ? 'unlike' : 'like'
  const effect = isLiked ? 'negative' : 'positive'

  const handleClick = () => {
    !currentUserId
      ? setShowModal(true)
      : handleReaction(action, effect, likes, 'isLiked')
  }

  return (
    <div
      className={`${
        isLiked ? 'reactions__block clicked--like' : 'reactions__block'
      }`}
    >
      <i
        onClick={handleClick}
        className={`${
          isLiked ? 'reactions__like reactions__liked' : 'reactions__like'
        }`}
      >
        <LikeIcon state={isLiked} size="2.5rem" />
      </i>
      <span>{likes && likes.length}</span>
    </div>
  )
}

