import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome">
      <h2 className="welcome__title">Welcome to Techblog</h2>
      <p className="welcome__slogan">
        <Link to="/">TechBlog</Link> is a community of developers who share
      </p>
    </div>
  );
};

export default Welcome;
