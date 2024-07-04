import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Asteric from "./Asteric";
import * as formik from "formik";
import * as yup from "yup";

export default function AddAuthor({
  addShow,
  setAddShow,
  listOfAuthors,
  setListOfAuthors,
}) {
  const { Formik } = formik;

  //initial value of data
  const initialValues = {
    name: "",
    biography: "",
  };

  //form validation done by yup library
  const schema = yup.object().shape({
    name: yup.string().required(),
    biography: yup.string().required(),
  });

  const onSubmitAddAuthor = async (authorData, { resetForm }) => {
    console.log(authorData);
    try {
      const response = await fetch("http://localhost:5000/authors", {
        method: "POST",
        body: JSON.stringify(authorData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //  add new book data to setlistOfBooks after adding new book
      setListOfAuthors([...listOfAuthors, authorData]);
      // After submission, reset the form
      resetForm();
    } catch (error) {
      console.error(
        "There was a problem with the new Author POST request:",
        error
      );
    }
  };

  if (addShow) {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitAddAuthor}
        validationSchema={schema}
      >
        {({
          handleSubmit,
          handleChange,
          isSubmitting,
          values,
          touched,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="mt-3 p-2 border border-secondary border-2 shadow bg-secondary bg-opacity-25"
          >
            <Row className="mb-3 mt-2">
              <Form.Group as={Col} controlId="validationFormik01" md="4">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependName">
                    <Asteric />
                  </InputGroup.Text>

                  <Form.FloatingLabel
                    controlId="floatingName"
                    label="Enter Name"
                  >
                    <Form.Control
                      type="text"
                      name="name"
                      aria-describedby="inputGroupPrependName"
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      required
                      autoComplete="off"
                      className="shadow"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="validationFormik01" md="8">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependBio">
                    <Asteric />
                  </InputGroup.Text>

                  <Form.FloatingLabel
                    controlId="floatingBio"
                    label="Enter Author's Biography"
                  >
                    <Form.Control
                      type="text"
                      name="biography"
                      aria-describedby="inputGroupPrependbio"
                      onChange={handleChange}
                      isInvalid={!!errors.biography}
                      required
                      autoComplete="off"
                      className="shadow"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.biography}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mt-3 mb-2">
              <Col md="9"></Col>
              <Col>
                <Button
                  type="submit"
                  variant="success"
                  className="border-dark shadow"
                  disabled={isSubmitting}
                >
                  Add Author
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => setAddShow(false)}
                  className="border-dark shadow"
                >
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    );
  }
}
