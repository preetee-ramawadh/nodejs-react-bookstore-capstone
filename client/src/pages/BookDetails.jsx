import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Placeholder from "react-bootstrap/Placeholder";

export default function BookDetails(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
      className="bg-secondary bg-opacity-10"
    >
      <Modal.Header closeButton className="bg-dark text-capitalize">
        <Placeholder
          as={Modal.Title}
          animation="glow"
          id="contained-modal-title-vcenter"
          className="text-light"
        >
          <Placeholder bg="dark">
            <strong>{props.selectedbook.title}</strong>
          </Placeholder>
        </Placeholder>

        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-opacity-50">
        <h4 className="text-capitalize">
          <strong>Author:</strong>
          {props.selectedbook.Author?.name}
        </h4>
        <h4>
          <strong>Genre:</strong> {props.selectedbook.Genre?.genre_name}
        </h4>
        <h4>
          <strong>Price:</strong>
          {props.selectedbook.price}
        </h4>
        <h4>
          <strong>Published On:</strong> {props.selectedbook.publication_date}
        </h4>
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button variant="outline-dark rounded-pill" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
