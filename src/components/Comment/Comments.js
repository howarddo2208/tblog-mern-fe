import React, { createContext, useContext, useEffect, useState } from 'react'
import Comment from './Comment'
import { NewComment } from './NewComment/NewComment'
import { useHttpClient } from '../../hooks/useHttpClient'
import { getReplies } from '../../utils'
import ErrorModal from '../Modal/ErrorModal'
import './Comments.css'
import { useAuth } from '../../stateManagements'

export const CommentContext = createContext()

const Comments = ({ postAuthor, postId }) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.userId
  const [activeComment, setActiveComment] = useState(null)
  const [comments, setComments] = useState([])
  const rootComments =
    comments && comments.filter((comment) => comment && !comment.parentId)
  const { sendReq, error, clearError } = useHttpClient()
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/comments/${postId}`
        )
        setComments(responseData.comments)
      } catch (err) {}
    }
    fetchComments()
  }, [sendReq, postId])

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        postId,
        postAuthor,
        activeComment,
        setActiveComment,
      }}
    >
      <ErrorModal error={error} onClose={clearError} />
      <div className="comments">
        <h2>{`Discussion (${
          comments ? `${comments.length} comments` : 0
        })`}</h2>
        <NewComment />
        {rootComments &&
          rootComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              replies={getReplies(comments, comment._id)}
              parentId={comment.parentId}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </CommentContext.Provider>
  )
}

export default Comments

