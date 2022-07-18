import React from "react";
import { formatDate } from "../../utils";

const NotificationBody = ({ type, notification }) => {
  const { post, comment } = notification;
  const createdAt = formatDate(notification.date);
  const name = notification.sender && notification.sender.name;
  if (type === "like") {
    return (
      <>
        <div className="notif__meta">
          <span className="meta__title">{name} liked your post</span>
          <span className="meta__time">{createdAt}</span>
        </div>
        <p>{post && post.title}</p>
      </>
    );
  } else if (type === "comment") {
    return (
      <>
        <div className="notif__meta">
          <span className="meta__title">{name} commented on your post</span>
          <span className="meta__time">{createdAt}</span>
        </div>
        <p>"{comment && comment.body}"</p>
      </>
    );
  } else if (type === "newPost") {
    return (
      <div className="notif__meta">
        <span className="meta__title">{name} just released a new post</span>
        <span className="meta__time">{createdAt}</span>
      </div>
    )
  }
  else {
    return (
      <div className="notif__meta">
        <span className="meta__title">{name} followed you</span>
        <span className="meta__time">{createdAt}</span>
      </div>
    );
  }
};

export default NotificationBody;
