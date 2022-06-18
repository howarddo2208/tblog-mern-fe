import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import Layout from '../../components/Layout'
import ErrorModal from '../../components/Modal/ErrorModal'
import PostList from '../../components/PostList/PostList'
import useHttpClient from '../../hooks/useHttpClient'
import { useAuth } from '../../stateManagements'

const ReadingList = () => {
  const [loadedPosts, setLoadedPosts] = useState([])
  const { userId } = useParams()
  const { currentUser } = useAuth()
  const { isLoading, sendReq, error, clearError } = useHttpClient()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}/bookmarks`,
          'GET',
          null,
          {
            Authorization: `Bearer ${currentUser.token}`,
          }
        )
        setLoadedPosts(responseData.posts)
      } catch (err) {}
    }
    fetchPosts()
  }, [sendReq, userId, currentUser])
  return (
    <Layout>
      <ErrorModal error={error} onClose={clearError} />
      <div className="container-posts reading-list">
        <h2 className="reading-list__heading">
          {currentUser && `${currentUser.name}'s Reading list`}
        </h2>

        {loadedPosts ? (
          <PostList cover={false} items={loadedPosts} isLoading={isLoading} />
        ) : (
          <p>Your reading list is empty!</p>
        )}
      </div>
    </Layout>
  )
}

export default ReadingList

