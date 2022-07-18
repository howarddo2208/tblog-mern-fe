import React from "react";
import PostPreview from "../PostPreview/PostPreview";
import SkeletonPostList from "../Skeleton/SkeletonPostList";
import "./PostList.css";

const PostList = (props) => {
  return (
    <div className="container container-posts">
      {(
        <ul>
          {props.items &&
            props.items.map((post, i) => {
              return (
                <PostPreview
                  cover={i === 0 ? props.cover : false}
                  key={`post${i}`}
                  id={post.id}
                  title={post.title}
                  body={post.body}
                  image={post.image}
                  date={post.date}
                  author={props.author || post.author}
                  tags={post.tags}
                  titleURL={post.titleURL}
                  likes={post.likes}
                  unicorns={post.unicorns}
                  bookmarks={post.bookmarks}
                  comments={post.comments}
                  imgToxic={post.imgToxic}
                  imgClassified={post.imgClassified}
                />
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default PostList;
