import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ModalContent from "./ModalContent";

Modal.setAppElement("#root");
export default props => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Link
        to="/login"
        onClick={() => setShowModal(true)}
        className="nav-menu-auth-anchor"
      >
        Log In
      </Link>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Sign In/Sign up"
        style={{
          overlay: {
            backgroundColor: null
          },
          content: {
            padding: 0,
            backgroundColor: null,
            border: null,
            fontColor: null
          }
        }}
      >
        <ModalContent formType="login" />
      </Modal>
    </React.Fragment>
  );
};
