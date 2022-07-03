import { useEffect, useState } from 'react'
import React from 'react'
import { DeleteComment } from './DeleteComment/DeleteComment'
import { EditComment } from './EditComment/EditComment'
import { EditCommentButton } from './EditComment/EditCommentButton'
import { LikeComment } from './LikeComment/LikeComment'
import { NewComment } from './NewComment/NewComment'
import { ReplyButton } from './ReplyButton'
import { formatDate, isEditing, isReplying } from '../../utils'
import Avatar from '../Avatar/Avatar'
import AuthModal from '../Modal/AuthModal'
import { useAIModels, useAuth, useComment } from '../../state'
import { sendClassifyComment, sendClassifyPost } from '../../utils/classifyAPI'

const Comment = ({ comment, replies, parentId = null }) => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser?.id
  const { activeComment } = useComment()
  const [showModal, setShowModal] = useState(false)
  const createdAt = formatDate(comment.date)
  const { toxicity } = useAIModels()
  const { isClassified, isToxic } = comment
  const [isHidden, setIsHidden] = useState(isToxic)

  const classifyComment = async () => {
    const predictions = await toxicity.classify(comment.body)
    const matchToxic = predictions[6].results[0].match
    setIsHidden(matchToxic)
    sendClassifyComment(comment.id, matchToxic)
  }

  useEffect(() => {
    if (toxicity && !isClassified) {
      classifyComment()
    }
  }, [comment.body, toxicity, isClassified])

  const unHide = () => {
    setIsHidden(false)
  }

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
              isHidden ? (
                <div style={{
                  color: 'gray',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                  onClick={unHide}>this comment is toxic, click to view</div>
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

export default React.memo(Comment)

