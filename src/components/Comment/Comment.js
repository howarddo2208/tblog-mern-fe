import { useContext, useEffect, useState } from 'react'
import React from 'react'
import { CommentContext } from './Comments'
import { DeleteComment } from './DeleteComment/DeleteComment'
import { EditComment } from './EditComment/EditComment'
import { EditCommentButton } from './EditComment/EditCommentButton'
import { LikeComment } from './LikeComment/LikeComment'
import { NewComment } from './NewComment/NewComment'
import { ReplyButton } from './ReplyButton'
import { formatDate, isEditing, isReplying } from '../../utils'
import Avatar from '../Avatar/Avatar'
import AuthModal from '../Modal/AuthModal'
import { useAIModels } from '../../stateManagements'

const Comment = ({ comment, replies, parentId = null, currentUserId }) => {
  const { activeComment } = useContext(CommentContext)
  const [showModal, setShowModal] = useState(false)
  const createdAt = formatDate(comment.date)
  const { toxicity } = useAIModels()
  const classifyComment = async () => {
    const predictions = await toxicity.classify(comment.body)
    if (predictions[6].results[0].match) {
      setToxic(true)
    }
  }
  const [isToxic, setToxic] = useState(false)
  useEffect(() => {
    if (toxicity) {
      classifyComment()
    }
  }, [comment.body, toxicity])

  return (
    <>
      <div className="container-comment">
        <Avatar
          className="author__image--comment"
          src={`${comment.author.avatar}`}
          link={`/users/${comment.author.id}`}
        />
        <div className="comment">
          <div className="comment__content">
            <div className="comment__meta">
              <div className="comment__author">{comment.author.name}</div>
              <span>{createdAt}</span>
            </div>

            {!isEditing(activeComment, comment.id) ? (
              isToxic ? (
                <div>this comment is toxic</div>
              ) : (
                <div className="comment__body">{comment.body}</div>
              )
            ) : (
              <EditComment
                commentId={comment.id}
                commentBody={comment.body}
                setShowModal={setShowModal}
              />
            )}
          </div>
          <AuthModal onClose={() => setShowModal(false)} show={showModal} />
          <div className="preview__reactions">
            <div className="preview__reactions--left">
              <LikeComment
                likes={comment.likes}
                commentId={comment.id}
                setShowModal={setShowModal}
              />
              <ReplyButton
                currentUserId={currentUserId}
                comment={comment}
                setShowModal={setShowModal}
              />
            </div>

            <div className="preview__reactions--right">
              <EditCommentButton
                currentUserId={currentUserId}
                commentId={comment.id}
                authorId={comment.author.id}
              />
              <DeleteComment
                commentId={comment.id}
                authorId={comment.author.id}
              />
            </div>
          </div>
        </div>
      </div>

      {isReplying(activeComment, comment.id) && (
        <NewComment replyId={parentId ? parentId : comment.id} />
      )}
      <div className="replies" style={{ marginLeft: '5rem' }}>
        {replies.length > 0 &&
          replies.map((reply) => (
            <Comment
              comment={reply}
              key={reply._id}
              replies={[]}
              parentId={comment.id}
              currentUserId={currentUserId}
            />
          ))}
      </div>
    </>
  )
}

export default Comment

