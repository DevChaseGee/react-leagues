import React from "react";
import Alert from "react-bootstrap/Alert";

function DeleteAlert({show, onHandleHideAlert }) {
  return (
    <Alert variant="success" show={show} onClose={onHandleHideAlert} dismissible>
      <Alert.Heading>Team was successfully deleted!</Alert.Heading>
    </Alert>
  );
}

export default DeleteAlert;
