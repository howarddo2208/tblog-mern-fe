import React, { useState, useEffect, useContext } from 'react'
import Posts from '../../components/Post/Posts'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import useHttpClient from '../../hooks/useHttpClient'
import { AuthContext } from '../../context/auth'
import Layout from '../../components/Layout'

const Home = () => {
  const [tags, setTags] = useState([])
  const { sendReq, isLoading } = useHttpClient()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags/home`
        )
        setTags(responseData.tags)
      } catch (err) {}
    }
    fetchPosts()
  }, [sendReq])

  return (
    <Layout>
      <Posts cover={true} />
    </Layout>
  )
}

export default Home

