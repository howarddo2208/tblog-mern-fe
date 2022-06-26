import React, { useContext } from 'react'
import CommentForm from './CommentForm'
import useHttpClient from '../../../hooks/useHttpClient'
import ErrorModal from '../../Modal/ErrorModal'
import { CommentContext } from '../Comments'
import { useAuth, useSocket } from '../../../stateManagements'

export const NewComment = ({ replyId }) => {
  const { setActiveComment, setComments, postId, postAuthor } =
    useContext(CommentContext)
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
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        }
      )
      setComments((comments = []) => [newComment.comment, ...comments])

      if (socket) {
        socket.emit('comment', {
          sender: currentUser,
          postId,
          receiver: postAuthor,
        })
      }
    } catch (err) {}
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

