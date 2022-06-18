import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FollowTag } from "./FollowTag";
import AuthModal from "../Modal/AuthModal";

const TagItem = ({ name, id, followers, clickFollowButton }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AuthModal onClose={ () => setShowModal(false) } show={ showModal } />
      <div className="tags__item">
        <Link to={ `/tags/${name}` } className="tag__name">
          <h3>#{ name }</h3>
        </Link>
        <FollowTag
          followers={ followers }
          tagId={ id }
          setShowModal={ setShowModal }
        />
      </div>
    </>
  );
};

export default TagItem;
