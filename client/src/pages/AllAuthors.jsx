import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AuthorDetails from "./AuthorDetails";
import Spinner from "./Spinner";
import DeleteAlert from "./DeleteAlert";
import AddAuthor from "./AddAuthor";

export default function AllAuthors() {
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedauthor, setSelectedAuthor] = useState({});
  const [authortoedit, editAuthor] = useState({});

  const [modalShow, setModalShow] = useState(false);

  const [alertShow, setAlertShow] = useState(false);

  const [deleteYes, setDeleteYes] = useState(false);

  const [addShow, setAddShow] = useState(false);

  useEffect(() => {
    const fetchAuthorsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("jsonData", jsonData);
        setListOfAuthors(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors data:", error);
      }
    };
    fetchAuthorsData();
  }, []);

  if (listOfAuthors.length > 0) {
    if (loading) {
      return <Spinner />;
    }
  }

  const showAuthorDetails = (author) => {
    console.log("inside showAuthorDetails function", author.author_id);
    setSelectedAuthor(author);
    setModalShow(true);
  };

  const editAuthorDetails = (author) => {
    console.log("inside editAuthorDetails function", author.name);
    editAuthor(author);
    console.log("author to edit:", authortoedit);
  };

  const deleteAuthor = async (authorId) => {
    console.log("inside deleteAuthor function");
    setAlertShow(true);
    if (deleteYes) {
      setDeleteYes(false);
      setAlertShow(false);
      try {
        const response = await fetch(
          "http://localhost:5000/authors/" + authorId,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Update listOfBooks after deletion
        setListOfAuthors(
          listOfAuthors.filter((author) => author.author_id !== authorId)
        );
      } catch (error) {
        console.error("There was a problem with the DELETE request:", error);
      }
    }
  };

  // const addAuthor = () => {
  //   setAddShow(true);
  // };

  return (
    <div className="row">
      <DeleteAlert
        alertShow={alertShow}
        setAlertShow={setAlertShow}
        setDeleteYes={setDeleteYes}
        value="Author"
      />
      <Button
        variant="primary"
        onClick={() => setAddShow(true)}
        className="shadow btn btn-success border border-secondary"
      >
        ADD Author
      </Button>

      <AddAuthor
        addShow={addShow}
        setAddShow={setAddShow}
        listOfAuthors={listOfAuthors}
        setListOfAuthors={setListOfAuthors}
      />

      {listOfAuthors?.length > 0 ? (
        listOfAuthors.map((author, key) => {
          return (
            <div key={key} className="d-flex col m-2">
              <Card
                style={{
                  width: "18rem",
                }}
                className="shadow"
              >
                <Card.Img
                  variant="top"
                  src="/images/authors/david-godman.jpeg"
                  alt="no image"
                  style={{ maxHeight: "300px" }}
                />
                <Card.Body className="text-center">
                  <Card.Link
                    id={author.author_id}
                    href="#"
                    onClick={() => {
                      showAuthorDetails(author);
                    }}
                    className="text-info"
                  >
                    {author.name}
                  </Card.Link>
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button
                    variant="primary"
                    onClick={() => {
                      editAuthorDetails(author.author_id);
                    }}
                    className="me-2 shadow btn btn-primary border border-secondary"
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => deleteAuthor(author.author_id)}
                    className="shadow btn btn-danger border border-secondary"
                  >
                    DELETE
                  </Button>
                </Card.Footer>
              </Card>

              <AuthorDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedauthor={selectedauthor}
              />
            </div>
          );
        })
      ) : (
        <h1>No Authors Present!!</h1>
      )}
    </div>
  );
}
