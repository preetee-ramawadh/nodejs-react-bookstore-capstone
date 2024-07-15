import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Placeholder from "react-bootstrap/Placeholder";

export default function AuthorDetails(props) {
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
            <strong>{props.selectedauthor.name}</strong>
          </Placeholder>
        </Placeholder>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-opacity-50">
        <h3 className="text-center">
          <strong>Biography</strong>
        </h3>
        <h4>
          <i>{props.selectedauthor.biography}</i>
        </h4>
        <h3 className="text-center">
          <strong>Penned Books</strong>
        </h3>

        <ul className="text-dark">
          {props.selectedauthor.Books?.length > 0 ? (
            props.selectedauthor.Books?.map((book) => (
              <li key={book.book_id}>
                <h4>
                  <i>{book.title}</i>
                </h4>
              </li>
            ))
          ) : (
            <h4>
              <i>No Books available here</i>
            </h4>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer className="bg-secondary">
        <Button variant="outline-dark rounded-pill" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
