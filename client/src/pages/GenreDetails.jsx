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
      <Modal.Header closeButton className="bg-info text-dark">
        <Placeholder
          as={Modal.Title}
          animation="glow"
          id="contained-modal-title-vcenter"
        >
          <Placeholder bg="info">
            <strong>{props.selectedgenre.genre_name}</strong>
          </Placeholder>
        </Placeholder>
      </Modal.Header>
      <Modal.Body>
        <ul className="text-info">
          {props.selectedgenre.Books?.length > 0 ? (
            props.selectedgenre.Books?.map((book) => (
              <li key={book.book_id}>
                <h4>
                  <i>{book.title}</i>
                </h4>
              </li>
            ))
          ) : (
            <h4>
              <i>No Books available in this genre</i>
            </h4>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
