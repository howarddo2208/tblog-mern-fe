import React from "react";
import { useComment } from "../../../state";
import { canModifyComment } from "../../../utils";

export const EditCommentButton = ({ currentUserId, commentId, authorId }) => {
  const { setActiveComment } = useComment()
  return (
    <>
      {canModifyComment(currentUserId, authorId) && (
        <button
          className="btn auth__edit"
          onClick={() => setActiveComment({ id: commentId, type: "editing" })}
        >
          Edit
        </button>
      )}
    </>
  );
};
