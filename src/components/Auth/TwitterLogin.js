import { AiOutlineTwitter } from "@react-icons/all-files/ai/AiOutlineTwitter";
import React from "react";

const TwitterLogin = () => {
  const handleClick = async () => {
    window.open(
      `${process.env.REACT_APP_BASE_URL}/users/auth/twitter`,
      "_self"
    );
  };
  return (
    <button className="btn btn__social btn--tw" onClick={ handleClick }>
      <i>
        <AiOutlineTwitter />
      </i>
      Continue with Twitter
    </button>
  );
};

export default TwitterLogin;
