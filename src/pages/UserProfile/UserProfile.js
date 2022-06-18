import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import { FollowUser } from "../../components/FollowUser/FollowUser";
import Layout from "../../components/Layout";
import AuthModal from "../../components/Modal/AuthModal";
import ErrorModal from "../../components/Modal/ErrorModal";
import PostList from "../../components/PostList/PostList";
import Shimmer from "../../components/Skeleton/Shimmer";
import SkeletonElement from "../../components/Skeleton/SkeletonElement";
import { UserInfo } from "../../components/User/UserInfo/UserInfo";
import { UserSideBar } from "../../components/User/UserSideBar/UserSideBar";
import { AuthContext } from "../../context/auth";
import { useHttpClient } from '../../hooks/useHttpClient'
import { renderRepeatedSkeletons } from "../../utils";

const UserProfile = () => {
  const [user, setUser] = useState({});
  // const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;

  const { posts } = user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        setUser(responseData.user);
        // setPosts(responseData.posts);
      } catch (err) {}
    };
    fetchUser();
  }, [sendReq, userId]);

  return (
    <Layout>
      <ErrorModal error={ error } onClose={ clearError } />
      <AuthModal onClose={ () => setShowModal(false) } show={ showModal } />
      <div className="container-layout container-user">
        <div className="user__main">
          <Avatar src={ user.avatar } isLoading={ isLoading } />
          <div className="main__cta">
            <h2>{ user.name }</h2>
            { userId === currentUserId ? (
              <Link
                className="btn btn--profile-cta btn--profile-edit"
                to={ `/users/${userId}/edit` }
              >
                Edit Profile
              </Link>
            ) : (
              <FollowUser
                followId={ user.id }
                followers={ user.followers }
                userToFollow={ user }
                setShowModal={ setShowModal }
              />
            ) }
          </div>
          { isLoading ? (
            <>
              { renderRepeatedSkeletons(<SkeletonElement type="text" />, 2) }
              <Shimmer />
            </>
          ) : (
            <UserInfo user={ user } />
          ) }
        </div>
        <div className="user__content">
          <UserSideBar user={ user } />
          <div className="wrapper__user--posts">
            <PostList
              cover={ false }
              items={ posts }
              author={ user }
              isLoading={ Boolean(!user.avatar) }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;

