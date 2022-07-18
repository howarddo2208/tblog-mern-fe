import React, { useMemo } from "react";
import NotificationBody from "./NotificationBody";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";

const Notification = ({ notification }) => {
  const link = useMemo(() => {
    switch (notification.notificationType) {
      case "like":
        return `/posts/${notification.post.id}`;
      case "comment":
        return `/posts/${notification.post.id}`;
      case "newPost":
        return `/posts/${notification.post.id}`;
      case "follow":
        return `/users/${notification.sender.id}`;
      default:
        return "";
    }
  })
  return (
    <div  >
      <Link to={link} className="notif">
        <Avatar
          src={notification.sender && notification.sender.avatar}
          link={`/users/${notification.sender.id}`}
        />
        <div className="notif__details">
          <NotificationBody
            type={notification.notificationType}
            notification={notification}
          />
        </div>
      </Link>
    </div>
  );
};

export default Notification;
