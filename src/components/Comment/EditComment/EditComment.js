import React, { useContext } from 'react'
import useHttpClient from '../../../hooks/useHttpClient'
import { useAuth } from '../../../state'
import ErrorModal from '../../Modal/ErrorModal'
import { CommentContext } from '../Comments'
import CommentForm from '../NewComment/CommentForm'

export const EditComment = ({ commentId, commentBody, setShowModal }) => {
  const { setActiveComment, comments, setComments } = useContext(CommentContext)
  const { currentUser } = useAuth()
  const { sendReq, error, clearError } = useHttpClient()

  const updateComment = async (body, commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, body } : comment
    )
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/comments/${commentId}`,
        'PATCH',
        JSON.stringify({ body, author: currentUser.userId }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      )
    } catch (err) {}
    setComments(updatedComments)
    setActiveComment(null)
  }

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <CommentForm
        submitLabel="Edit comment"
        hasCancelButton={true}
        initialText={commentBody}
        handleSubmit={(text) => updateComment(text, commentId)}
        handleCancel={() => setActiveComment(null)}
      />
    </>
  )
}

