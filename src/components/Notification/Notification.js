import React from "react";
import NotificationBody from "./NotificationBody";
import Avatar from "../Avatar/Avatar";

const Notification = ({ notification, type, children }) => {
  return (
    <div className="notif">
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
    </div>
  );
};

export default Notification;
