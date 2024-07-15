import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Placeholder from "react-bootstrap/Placeholder";

export default function GenreDetails(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton className="bg-dark text-light text-capitalize">
        <Placeholder
          as={Modal.Title}
          animation="glow"
          id="contained-modal-title-vcenter"
        >
          <Placeholder bg="dark">
            <strong>{props.selectedgenre.genre_name}</strong>
          </Placeholder>
        </Placeholder>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-opacity-50">
        <ul className="text-dark">
          {props.selectedgenre.Books?.length > 0 ? (
            props.selectedgenre.Books?.map((book) => (
              <li key={book.book_id}>
                <h4>{book.title}</h4>
              </li>
            ))
          ) : (
            <h4>No Books available in this genre</h4>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button
          variant="outline-dark"
          onClick={props.onHide}
          className="rounded-pill"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
