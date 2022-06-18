import React, { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/auth";
import useHttpClient from "../../../hooks/useHttpClient";
import { classifyToxicity } from "../../../utils/toxicClassify";
import ErrorModal from "../../Modal/ErrorModal";
import { CommentContext } from "../Comments";
import CommentForm from "../NewComment/CommentForm";

export const EditComment = ({ commentId, commentBody, setShowModal }) => {
  const { setActiveComment, comments, setComments } =
    useContext(CommentContext);
  const { currentUser } = useContext(AuthContext);
  const { sendReq, error, clearError } = useHttpClient();

  const updateComment = async (body, commentId) => {
    const predictions = classifyToxicity(body);
    if (predictions[6].results[0].match) {
      toast.error("Your comment is toxic!");
      return;
    }
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, body } : comment
    );
    //update comment from backend
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/comments/${commentId}`,
        "PATCH",
        JSON.stringify({ body, author: currentUser.userId }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
    } catch (err) {}
    setComments(updatedComments);
    setActiveComment(null);
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <CommentForm
        submitLabel="Edit comment"
        hasCancelButton={true}
        initialText={commentBody}
        handleSubmit={(text) => updateComment(text, commentId)}
        handleCancel={() => setActiveComment(null)}
      />
    </>
  );
};
