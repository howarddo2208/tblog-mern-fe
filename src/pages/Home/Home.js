import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Posts from "../../components/Post/Posts";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { AuthContext } from "../../context/auth";
import useHttpClient from "../../hooks/useHttpClient";

const Home = () => {
  const [tags, setTags] = useState([]);
  const { sendReq, isLoading } = useHttpClient();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags/home`
        );
        setTags(responseData.tags);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return (
    <Layout>
      <Posts cover={true} />
    </Layout>
  );
};

export default Home;
