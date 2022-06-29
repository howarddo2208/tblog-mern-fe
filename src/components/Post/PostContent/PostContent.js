import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../state'
import { formatDate } from '../../../utils'
import Avatar from '../../Avatar/Avatar'
import Comments from '../../Comment/Comments'
import { PostImage } from '../../PostImage/PostImage'
import { PostTags } from '../../PostTags/PostTags'
import SyntaxHighlight from '../../SyntaxHighlight/SyntaxHighlight'
import { DeletePost } from '../DeletePost'
import './PostContent.css'

const PostContent = ({ post, handleDelete }) => {
  const { image, author, titleURL, date, title, tags, body, id } = post
  const createdAt = formatDate(date)
  const { currentUser } = useAuth()
  const currentUserId = currentUser && currentUser.userId

  return (
    <div className="post">
      <PostImage src={image} alt={`Cover image for ${title}`} />
      <div className="post__body">
        <div className="post__author">
          <Avatar link={`/users/${author.id}`} src={author.avatar} />
          <div className="author__details">
            <Link to={`/users/${author.id}`}>
              <h4>{author.name}</h4>
            </Link>
            <p>{createdAt}</p>
          </div>
        </div>
        <h1 className="post__heading">{title}</h1>
        <PostTags tags={tags} />
        <div className="post__text">
          <ReactMarkdown components={SyntaxHighlight}>{body}</ReactMarkdown>
        </div>

        <div className="post__auth">
          {currentUserId === author.id && (
            <Link className="auth__edit" to={`/posts/${titleURL}/${id}/edit`}>
              Edit Post
            </Link>
          )}

          <DeletePost authorId={author.id} />
        </div>
      </div>
      {post.comments && <Comments postId={id} postAuthor={author} />}
    </div>
  )
}

export default PostContent

