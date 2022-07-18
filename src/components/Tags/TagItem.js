import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FollowTag } from "./FollowTag";
import AuthModal from "../Modal/AuthModal";

const TagItem = ({ name, id, followers, posts }) => {
  const [showModal, setShowModal] = useState(false);

  //random hex color
  const randomColor = useMemo(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color
  }, [id])

  return (
    <>
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      <div className="tags__item" style={{ backgroundColor: randomColor }}>
        <Link to={`/tags/${name}`} className="tag__name">
          <h3>#{name}</h3>
        </Link>
        <FollowTag
          followers={followers}
          tagId={id}
          setShowModal={setShowModal}
        />
        <div style={{ display: 'flex', color: 'white', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <h4>{followers.length} followers</h4>
          <h4>{posts.length} posts published</h4>
        </div>
      </div>
    </>
  );
};

export default TagItem;
