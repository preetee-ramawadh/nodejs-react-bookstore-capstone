import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function EditBook(props) {
  const { Formik } = formik;

  const [loading, setLoading] = useState(true);

  const [mappedAuthors, setMappedAuthors] = useState([]);

  const [mappedGenres, setMappedGenres] = useState([]);

  const [updatedBookData, setUpdatedBookData] = useState({});

  useEffect(() => {
    setUpdatedBookData(props.selectedbook);
  }, [props.selectedbook]);

  console.log("updatedBookData", updatedBookData);

  //initial value of data
  const initialValues = {
    title: props.selectedbook.title,
    author_id: props.selectedbook.Author?.name,
    genre_id: props.selectedbook.Genre?.genre_name,
    price: props.selectedbook.price,
    publication_date: props.selectedbook.publication_date,
  };
  //console.log("initialValues::", initialValues);

  //form validation done by yup library
  const schema = yup.object().shape({
    title: yup.string().required(),
    author_id: yup.string().required("Please select an author"),
    genre_id: yup.string().required("Please select a genre"),
    price: yup.number().required(),
    publication_date: yup.date().required(),
  });

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const authorsData = await response.json();
        const mappedAuthorslist = authorsData.map((author) => ({
          id: author.author_id,
          name: author.name,
        }));
        setMappedAuthors(mappedAuthorslist);
        setLoading(false);
        console.log("mappedAuthors::", mappedAuthors);
      } catch (error) {
        console.error("Error fetching authors data:", error);
      }
    };
    fetchAuthorsData();
  }, []);

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const response = await fetch("http://localhost:5000/genres");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const genresData = await response.json();
        console.log("genresData", genresData);
        const mappedGenresList = genresData.map((genre) => ({
          id: genre.genre_id,
          name: genre.genre_name,
        }));
        setMappedGenres(mappedGenresList);
        setLoading(false);
        console.log("mappedGenres::", mappedGenres);
      } catch (error) {
        console.error("Error fetching genres data:", error);
      }
    };
    fetchGenresData();
  }, []);

  const handleSubmit = async (event) => {
    alert("inside handleSubmit");
    console.log("Submitted values:::");
    event.preventDefault();
    console.log("Submitted values:", JSON.stringify(updatedBookData));

    try {
      const response = await fetch(
        `http://localhost:5000/books/${props.selectedbook.book_id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(updatedBookData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //update state
      props.updatebook(updatedBookData);
      //actions.setSubmitting(false);
      props.onHide(); // Close the modal after submission
    } catch (error) {
      console.error(
        "There was a problem with the new book POST request:",
        error
      );
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      {(formikProps) => (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          keyboard={false}
          centered
          className="bg-secondary bg-opacity-10"
        >
          <Modal.Header closeButton className="bg-info">
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Book Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary bg-opacity-25">
            <Form
              noValidate
              onSubmit={formikProps.handleSubmit}
              className="m-1 p-1 shadow bg-secondary bg-opacity-50"
            >
              <Row className="m-2">
                <Form.Group as={Col} controlId="validationFormik01">
                  <Form.FloatingLabel
                    controlId="floatingTitle"
                    label="Book Title"
                  >
                    <Form.Control
                      type="text"
                      name="title"
                      aria-describedby="inputGroupPrependTitle"
                      //value={formikProps.values.title}
                      value={updatedBookData.title}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          title: e.target.value,
                        })
                      }
                      //isInvalid={!!formikProps.errors.title}
                      isInvalid={
                        formikProps.touched.title && !!formikProps.errors.title
                      }
                      required
                      autoComplete="off"
                      className="shadow"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formikProps.errors.title}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="m-2">
                <Form.Group as={Col} controlId="validationFormik02">
                  <Form.FloatingLabel controlId="floatingAuthor" label="Author">
                    <Form.Select
                      name="author_id"
                      value={updatedBookData.author_id}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          author_id: e.target.value,
                        })
                      }
                      isInvalid={
                        formikProps.touched.author_id &&
                        !!formikProps.errors.author_id
                      }
                      className="shadow"
                    >
                      {mappedAuthors?.map((author) => {
                        return (
                          <option key={author.id} value={author.id}>
                            {author.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formikProps.errors.author_id}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId="validationFormik03">
                  <Form.FloatingLabel controlId="floatingGenre" label="Genre">
                    <Form.Select
                      name="genre_id"
                      value={updatedBookData.genre_id}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          genre_id: e.target.value,
                        })
                      }
                      isInvalid={
                        formikProps.touched.genre_id &&
                        !!formikProps.errors.genre_id
                      }
                      className="shadow"
                    >
                      {mappedGenres?.map((genre) => {
                        return (
                          <option key={genre.id} value={genre.id}>
                            {genre.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formikProps.errors.genre_id}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </Form.Group>
              </Row>
              <Row className="m-2">
                <Form.Group as={Col} controlId="validationFormik04" md="6">
                  <Form.FloatingLabel controlId="floatingPrice" label="Price">
                    <Form.Control
                      type="text"
                      name="price"
                      aria-describedby="inputGroupPrependPrice"
                      value={updatedBookData.price}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          price: e.target.value,
                        })
                      }
                      isInvalid={
                        formikProps.touched.price && !!formikProps.errors.price
                      }
                      required
                      autoComplete="off"
                      className="shadow"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formikProps.errors.price}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </Form.Group>

                <Form.Group as={Col} controlId="validationFormik05" md="6">
                  <Form.FloatingLabel
                    controlId="floatingPublished"
                    label="Enter Published On Date"
                  >
                    <Form.Control
                      type="text"
                      name="publication_date"
                      aria-describedby="inputGroupPrepend"
                      value={updatedBookData.publication_date}
                      onChange={(e) =>
                        setUpdatedBookData({
                          ...updatedBookData,
                          publication_date: e.target.value,
                        })
                      }
                      isInvalid={
                        formikProps.touched.publication_date &&
                        !!formikProps.errors.publication_date
                      }
                      required
                      autoComplete="off"
                      className="shadow"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formikProps.errors.publication_date}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer className="bg-info">
            <Button
              variant="primary"
              type="submit"
              onClick={formikProps.handleSubmit}
              disabled={formikProps.isSubmitting}
            >
              Save Changes
            </Button>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
}
