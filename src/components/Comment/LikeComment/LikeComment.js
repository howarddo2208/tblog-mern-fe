import React, { useState } from 'react'
import { LikeCommentButton } from './LikeCommentButton'
import useHttpClient from '../../../hooks/useHttpClient'
import { checkInArray } from '../../../utils'
import ErrorModal from '../../Modal/ErrorModal'
import { useAuth } from '../../../stateManagements'

export const LikeComment = ({ likes, commentId, setShowModal }) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.userId
  const { sendReq, error, clearError } = useHttpClient()
  const [isLiked, setLiked] = useState(checkInArray(likes, currentUserId))

  const handleLike = async () => {
    if (!currentUserId) {
      setShowModal(true)
      return
    }
    let action = checkInArray(likes, currentUserId) ? 'unlike' : 'like'
    if (action === 'unlike') {
      likes.splice(likes.indexOf(currentUserId), 1)
    } else {
      likes.push(currentUserId)
    }
    setLiked((isLiked) => !isLiked)
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/comments/${commentId}/${action}`,
        'PUT',
        JSON.stringify({ userId: currentUser.userId, commentId /* action */ }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      )
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <LikeCommentButton
        handleLike={handleLike}
        isLiked={isLiked}
        likes={likes}
      />
    </>
  )
}

