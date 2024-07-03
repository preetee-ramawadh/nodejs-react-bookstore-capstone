import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BookDetails(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Book Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 className="text-center">{props.selectedbook.title}</h2>
        <h4>Author: {props.selectedbook.Author?.name}</h4>
        <h4>Genre: {props.selectedbook.Genre?.genre_name}</h4>
        <h4>Price: {props.selectedbook.price}</h4>
        <h4>Published On: {props.selectedbook.publication_date}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
