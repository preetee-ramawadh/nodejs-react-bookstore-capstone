import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selectedauthor.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Biography: {props.selectedauthor.biography}</h4>
        <h4>Penned Books:</h4>

        <ul className="text-info">
          {props.selectedauthor.Books?.map((book) => (
            <li key={book.book_id}>
              <p>
                {/* <strong>Title:</strong> {book.title} */}
                {book.title}
              </p>
            </li>
          ))}
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
