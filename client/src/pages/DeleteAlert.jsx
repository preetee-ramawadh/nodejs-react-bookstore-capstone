import React from "react";
import { Alert, Button } from "react-bootstrap";

const DeleteAlert = ({ alertShow, setAlertShow, setDeleteYes, value }) => {
  const handleDeleteYes = () => {
    setDeleteYes(true); // This schedules a state update
    setAlertShow(false); // Close the alert after clicking "Yes"
  };

  if (alertShow) {
    return (
      <Alert variant="warning" onClose={() => setAlertShow(false)} dismissible>
        <Alert.Heading>
          Are you sure you want to delete the {value}?
          <Button onClick={handleDeleteYes} className="ms-5">
            Yes
          </Button>
        </Alert.Heading>
      </Alert>
    );
  }

  return null; // Return null if alertShow is false
};

export default DeleteAlert;
