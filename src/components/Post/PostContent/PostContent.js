import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import useHttpClient from '../../../hooks/useHttpClient'
import { useAIModels, useAuth } from '../../../state'
import { formatDate } from '../../../utils'
import { classifyImg, sendClassifyPost } from '../../../utils/classifyAPI'
import Avatar from '../../Avatar/Avatar'
import Comments from '../../Comment/Comments'
import { PostImage } from '../../PostImage/PostImage'
import { PostTags } from '../../PostTags/PostTags'
import SyntaxHighlight from '../../SyntaxHighlight/SyntaxHighlight'
import { DeletePost } from '../DeletePost'
import './PostContent.css'

const PostContent = ({ post, handleDelete }) => {
  const { image, author, date, title, tags, body, id, bodyClassified, bodyToxic, imgToxic, imgClassified } = post
  const createdAt = formatDate(date)
  const { toxicity } = useAIModels()
  const [bodyIsHidden, setBodyHidden] = useState(bodyToxic)

  const classifyBody = async () => {
    const predictions = await toxicity.classify(body)
    const isToxic = predictions[6].results[0].match
    sendClassifyPost(id, isToxic, 'body').then(() => {
      setBodyHidden(!isToxic)
    })
  }

  useEffect(() => {
    if (toxicity && !bodyClassified) {
      classifyBody()
    }
  }, [post, toxicity])



  const unHide = () => {
    setBodyHidden(false)
  }

  return (
    <div className="post">
      <PostImage src={image} alt={`Cover image for ${title}`} imgToxic={imgToxic}
        imgClassified={imgClassified}
      />
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
          {
            (bodyIsHidden) ? (
              <div style={{
                color: 'gray',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
                onClick={unHide}>This content is toxic, click if you want to see it</div>
            ) : (
              <ReactMarkdown components={SyntaxHighlight}>{body}</ReactMarkdown>
            )
          }
        </div>

        <div className="post__auth">
          <DeletePost authorId={author.id} />
        </div>
      </div>
      {post.comments && <Comments postId={id} postAuthor={author} />}
    </div>
  )
}

export default PostContent
