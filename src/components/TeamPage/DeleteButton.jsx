import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa";

function DeleteButton({
  bodyText,
  title,
  noText,
  confirmText,
  iconClass,
  itemKey,
  callback,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleConfirm = () => {
    callback(itemKey);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="m-2" variant="danger" onClick={handleShow}>
        <FaTrash />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{bodyText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {noText}
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteButton;
