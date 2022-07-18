import { FaDev } from "@react-icons/all-files/fa/FaDev";
import React from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import { GuestNavLinks } from "../MainNavigation/NavLinks/GuestNavLinks";

const AuthModal = (props) => {
  return (
    <Modal title="Log in to continue" show={props.show} onClose={props.onClose}>
      <div className="modal__container">
        <ul className="nav__list nav__list--modal">
          <GuestNavLinks loginFirst={false} />
        </ul>
      </div>
    </Modal>
  );
};

export default AuthModal;
