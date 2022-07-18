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
  const [canLoadMore, setCanLoadMore] = useState(true)

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  })

  const handleScroll = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight && canLoadMore) {
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
        setLoadedPosts((loaded) => [...loaded, ...responseData.posts]);
      }

      if (responseData.posts.length < size && currentUser.userId && endOfSub === false) {
        setEndOfSub(true)
      }
      else if (responseData.posts.length < size) {
        setCanLoadMore(false)
        document.removeEventListener("scroll", handleScroll);
      }
    } catch (err) { }
  };

  useEffect(() => {
    if (endOfSub) {
      if (fetchCount > 0) {
        setFetchCount(0)
      } else {
        fetchPosts()
      }
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
