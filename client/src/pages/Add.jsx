import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Asteric from "./Asteric";
import * as formik from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function Add({
  addShow,
  setAddShow,
  listOfBooks,
  setListOfBooks,
}) {
  const { Formik } = formik;
  const [loading, setLoading] = useState(true);

  const [mappedAuthors, setMappedAuthors] = useState([]);

  const [mappedGenres, setMappedGenres] = useState([]);

  //initial value of data
  const initialValues = {
    title: "",
    author_id: "",
    genre_id: "",
    price: "",
    publication_date: "",
  };

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

  const onSubmitAddBook = async (bookData, { resetForm }) => {
    console.log(bookData);
    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      //  after adding new book, add new book data to setlistOfBooks
      setListOfBooks([...listOfBooks, bookData]);

      // After submission, reset the form
      resetForm();
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

  if (addShow) {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitAddBook}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, isSubmitting, values, errors }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className="mt-3 border border-secondary border-2 shadow"
          >
            <Row className="mb-3 mt-2">
              <Form.Group as={Col} controlId="validationFormik01" md="6">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependTitle">
                    <Asteric />
                  </InputGroup.Text>

                  <Form.FloatingLabel
                    controlId="floatingTitle"
                    label="Enter Title"
                  >
                    <Form.Control
                      type="text"
                      name="title"
                      aria-describedby="inputGroupPrependTitle"
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                      required
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="validationFormik02">
                <Form.FloatingLabel
                  controlId="floatingAuthor"
                  label="Author"
                  className="mb-3"
                >
                  <Form.Select
                    name="author_id"
                    onChange={handleChange}
                    isInvalid={!!errors.author_id}
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
                    {errors.author_id}
                  </Form.Control.Feedback>
                </Form.FloatingLabel>
              </Form.Group>

              <Form.Group as={Col} controlId="validationFormik03">
                <Form.FloatingLabel
                  controlId="floatingGenre"
                  label="Genre"
                  className="mb-3"
                >
                  <Form.Select
                    name="genre_id"
                    onChange={handleChange}
                    isInvalid={!!errors.genre_id}
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
                    {errors.genre_id}
                  </Form.Control.Feedback>
                </Form.FloatingLabel>
              </Form.Group>
            </Row>

            <Row className=" mt-3 mb-3">
              <Form.Group as={Col} controlId="validationFormik04" md="6">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependPrice">
                    <Asteric />
                  </InputGroup.Text>

                  <Form.FloatingLabel
                    controlId="floatingPrice"
                    label="Enter Price"
                  >
                    <Form.Control
                      type="text"
                      name="price"
                      aria-describedby="inputGroupPrependPrice"
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                      required
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.FloatingLabel>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="validationFormik05" md="6">
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrependPublished">
                    <Asteric />
                  </InputGroup.Text>

                  <Form.FloatingLabel
                    controlId="floatingPublished"
                    label="Enter Published On Date"
                  >
                    <Form.Control
                      type="text"
                      name="publication_date"
                      aria-describedby="inputGroupPrepend"
                      onChange={handleChange}
                      isInvalid={!!errors.publication_date}
                      required
                      autoComplete="off"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.publication_date}
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
                  className="btn btn-success"
                  disabled={isSubmitting}
                >
                  Add Book
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => setAddShow(false)}
                  className="btn btn-secondary"
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
