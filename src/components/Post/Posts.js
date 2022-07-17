import React, { useEffect, useState, useRef } from "react";
import ErrorModal from "../../components/Modal/ErrorModal";
import useHttpClient from "../../hooks/useHttpClient";
import { useAuth } from "../../state";
import PostList from "../PostList/PostList";
const Posts = ({ cover }) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { currentUser } = useAuth()
  const [fetchCount, setFetchCount] = useState(0);
  const size = 5
  const [endOfSub, setEndOfSub] = useState(false)

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  })

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      setFetchCount(fetchCount + 1);
    }
  }

  const fetchPosts = async () => {
    try {
      let responseData
      if (currentUser.token) {
        responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts?page=${fetchCount}&size=${size}&endOfSub=${endOfSub}`,
          "GET",
          null,
          {
            Authorization: `Bearer ${currentUser.token}`
          }
        );
      } else {
        responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts?page=${fetchCount}&size=${size}`
        );
      }
      if (loadedPosts === []) {
        setLoadedPosts(responseData.posts);
      } else {
        setLoadedPosts([...loadedPosts, ...responseData.posts]);
      }

      if (responseData.posts.length < size && currentUser.userId && endOfSub === false) {
        setFetchCount(0)
        setEndOfSub(true)
      }
      else if (responseData.posts.length < size) {
        document.removeEventListener("scroll", handleScroll);
      }
    } catch (err) { }
  };

  useEffect(() => {
    if (endOfSub) {
      fetchPosts();
    }
  }, [endOfSub]);


  useEffect(() => {
    fetchPosts()
  }, [fetchCount])

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      {loadedPosts && (
        <PostList items={loadedPosts} cover={cover} />
      )}
    </>
  );
};

export default Posts;
