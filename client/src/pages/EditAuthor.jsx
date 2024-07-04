import { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditAuthor(props) {
  const [updatedAuthorData, setUpdatedAuthorData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUpdatedAuthorData(props.selectedauthor);
  }, [props.selectedauthor]);

  const validateUpdatedAuthor = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Author name is required";
    }
    if (!data.biography.trim()) {
      errors.biography = "Author biography is required";
    }
    return errors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = validateUpdatedAuthor(updatedAuthorData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form submission logic here
      try {
        const response = await fetch(
          `http://localhost:5000/authors/${props.selectedauthor.author_id}`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(updatedAuthorData),
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Form submitted successfully!");
        //update state
        props.updateauthor(updatedAuthorData);

        props.onHide(); // Close the modal after submission
      } catch (error) {
        console.error(
          "There was a problem with the new book POST request:",
          error
        );
      }
    } else {
      console.log(`Form submission failed
         due to validation errors.`);
    }
  };

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
      <Modal.Header closeButton>
        <Modal.Title>Edit Author Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-secondary bg-opacity-25">
        <Form className="m-1 p-1 shadow bg-secondary bg-opacity-50">
          <Row className="m-2">
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.FloatingLabel
                controlId="floatingTitle"
                label="Author's name"
              >
                <Form.Control
                  type="text"
                  name="name"
                  aria-describedby="inputGroupPrependTitle"
                  value={updatedAuthorData.name}
                  onChange={(e) =>
                    setUpdatedAuthorData({
                      ...updatedAuthorData,
                      name: e.target.value,
                    })
                  }
                  isInvalid={!!errors.name}
                  required
                  className="shadow"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.name}
                </Form.Control.Feedback>
              </Form.FloatingLabel>
            </Form.Group>
          </Row>

          <Row className="m-2">
            <Form.Group as={Col} controlId="validationFormik01">
              <Form.FloatingLabel
                controlId="floatingTitle"
                label="Author's Biography"
              >
                <Form.Control
                  type="text"
                  name="biography"
                  aria-describedby="inputGroupPrependTitle"
                  value={updatedAuthorData.biography}
                  onChange={(e) =>
                    setUpdatedAuthorData({
                      ...updatedAuthorData,
                      biography: e.target.value,
                    })
                  }
                  isInvalid={!!errors.biography}
                  required
                  className="shadow"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.biography}
                </Form.Control.Feedback>
              </Form.FloatingLabel>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>

        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}