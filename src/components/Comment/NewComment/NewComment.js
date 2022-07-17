import React, { useContext } from 'react'
import CommentForm from './CommentForm'
import useHttpClient from '../../../hooks/useHttpClient'
import ErrorModal from '../../Modal/ErrorModal'
import { useAuth, useComment, useSocket } from '../../../state'

export const NewComment = ({ replyId }) => {
  const { setActiveComment, comments, setComments, postId, postAuthor } = useComment()
  const { currentUser } = useAuth()
  const { socket } = useSocket()
  const { sendReq, error, clearError } = useHttpClient()
  const currentUserId = currentUser && currentUser.userId
  const createComment = async (text, parentId = null) => {
    const reqData = {
      parentPost: postId,
      body: text,
      author: currentUserId,
      parentId,
      userId: currentUserId,
    }
    try {
      const newComment = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/comments`,
        'POST',
        JSON.stringify(reqData),
        {
          Authorization: `Bearer ${currentUser?.token}`,
          'Content-Type': 'application/json',
        }
      )
      if (comments && comments.length > 0) {
        setComments([newComment.comment, ...comments])
      } else {
        setComments([newComment.comment])
      }

      if (socket && postAuthor) {
        socket.emit('comment', {
          sender: currentUser,
          postId,
          receiver: { id: postAuthor.id },
        })
      }
    } catch (err) {
      console.log('err', err)
    }
    setActiveComment(null)
  }
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <CommentForm
        avatar={replyId ? false : true}
        handleSubmit={(text) => createComment(text, replyId && replyId)}
        submitLabel={replyId ? 'Reply' : 'Submit'}
        handleCancel={() => setActiveComment(null)}
      />
    </>
  )
}

