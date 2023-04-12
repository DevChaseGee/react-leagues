import React from "react";
import Alert from "react-bootstrap/Alert";

function DeleteAlert({ onHandleHideAlert }) {
  return (
    <Alert variant="success" onClose={onHandleHideAlert} dismissible>
      <Alert.Heading>Team was successfully deleted!</Alert.Heading>
    </Alert>
  );
}

export default DeleteAlert;
