import { FaRegComment } from "@react-icons/all-files/fa/FaRegComment";
import React, { useContext } from "react";
import { CommentContext } from "./Comments";
import { canReply } from "../../utils";

export const ReplyButton = ({ currentUserId, comment, setShowModal }) => {
  const { setActiveComment } = useContext(CommentContext);
  const handleClick = () => {
    canReply(currentUserId)
      ? setActiveComment({ id: comment.id, type: "replying" })
      : setShowModal(true);
  };
  return (
    <button className="btn comments__total" onClick={handleClick}>
      <i>
        <FaRegComment size="2rem" />
      </i>
      <span className="reactions__text">Reply</span>
    </button>
  );
};
