import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import AuthModal from '../../components/Modal/AuthModal'
import ErrorModal from '../../components/Modal/ErrorModal'
import PostAuthor from '../../components/Post/PostAuthor/PostAuthor'
import PostContent from '../../components/Post/PostContent/PostContent'
import PostReactions from '../../components/Post/PostReactions/PostReactions'
import { SkeletonPage } from '../../components/Skeleton/SkeletonPage'
import { useHttpClient } from '../../hooks/useHttpClient'

const Post = (props) => {
  const [post, setPost] = useState({})
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  const { postId, titleURL } = useParams()
  const [showModal, setShowModal] = useState(false)

  let { author } = post

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`
        )
        setPost(responseData.post)
      } catch (err) {}
    }
    fetchPost()
  }, [sendReq, postId, titleURL])

  return (
    <>
      {isLoading && <SkeletonPage />}
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && post.author && (
        <div className="container-layout-post">
          <PostReactions post={post} setShowModal={setShowModal} />
          <AuthModal onClose={() => setShowModal(false)} show={showModal} />
          <div className="container-post">
            <PostContent post={post} />
            <PostAuthor
              setShowModal={setShowModal}
              author={author}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Post

