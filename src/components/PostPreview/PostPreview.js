import React, { useState, useEffect } from 'react'
import { AspectRatio } from 'react-aspect-ratio'
import { Link } from 'react-router-dom'
import { useAIModels, useAuth } from '../../state'
import { formatDate } from '../../utils'
import { AuthorInfo } from '../AuthorInfo/AuthorInfo'
import Avatar from '../Avatar/Avatar'
import { PostImage } from '../PostImage/PostImage'
import PreviewReactions from '../PostPreview/PreviewReactions'
import { PostTags } from '../PostTags/PostTags'

const PostPreview = (props) => {
  const [showModal, setShowModal] = useState(false)
  const { currentUser } = useAuth()
  const userId = currentUser && currentUser.userId

  const { title, id, image, author, date, titleURL, tags, cover, imgToxic, imgClassified } = props
  const createdAt = formatDate(date)

  return (
    <div className="preview flow-content">
      {cover && (
        <AspectRatio ratio="16/9">
          <PostImage
            link={`/posts/${titleURL}/${id}`}
            src={image}
            alt={`Cover image for ${title}`}
            imgToxic={imgToxic}
            imgClassified={imgClassified}
            postId={id}
          />
        </AspectRatio>
      )}
      <div className="preview__author">
        <Avatar link={`/users/${author.id}`} src={author.avatar} />
        <AuthorInfo status="preview" author={author} date={createdAt} />
      </div>
      <div className="preview__details flow-content">
        <Link to={`/posts/${titleURL}/${id}`} className="title-link">
          <h2>{title}</h2>
        </Link>
        <PostTags tags={tags} />
        <PreviewReactions
          userId={userId}
          post={props}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  )
}

export default React.memo(PostPreview)

