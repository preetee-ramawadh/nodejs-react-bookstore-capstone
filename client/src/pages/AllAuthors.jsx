import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import AuthorDetails from "./AuthorDetails";
import Spinner from "./Spinner";
import AddAuthor from "./AddAuthor";
import EditAuthor from "./EditAuthor";
import DeleteAlertAuthor from "./DeleteAlertAuthor";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import SortAuthorName from "./SortAuthorName";
import EditIcon from "./EditIcon";
import PaginationOnData from "./PaginationOnData";

export default function AllAuthors({
  currentPage,
  setCurrentPage,
  recordsPerPage,
  filteredRecords,
  setFilteredRecords,
  search,
  setSearch,
}) {
  const [listOfAuthors, setListOfAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedauthor, setSelectedAuthor] = useState({});

  const [authoridtodelete, setauthoridtodelete] = useState({});

  const [modalShow, setModalShow] = useState(false);

  const [alertShow, setAlertShow] = useState(false);

  const [addShow, setAddShow] = useState(false);

  const [showEditAuthorModal, setShowEditAuthorModal] = useState(false);

  const [sortAuthorByName, setsortAuthorByName] = useState([]);

  const [sortAuthorByNameStatus, setSortAuthorByNameStatus] = useState(true);

  const [imgURlArray, setImgURLArray] = useState([]);

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

        /**populate images from genres table in an imgURL array */

        // Extract or transform data from the dataset
        const imgURL = jsonData.map((a) => ({
          id: a.author_id,
          imageUrl: a.image_url,
        }));

        // Update the state with the constructed array
        setImgURLArray(imgURL);
        console.log("Authors imgURlArray:", imgURlArray);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching authors data:", error);
      }
    };
    fetchAuthorsData();
  }, []);

  //filtering data
  useEffect(() => {
    const filtered = listOfAuthors.filter((author) => {
      return search.toLowerCase() === ""
        ? author
        : author.name.toLowerCase().includes(search);
    });

    setFilteredRecords(filtered);
    setsortAuthorByName(filtered);
  }, [search, listOfAuthors]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredRecords.length / recordsPerPage);

  //function to pass to child component to update author
  const updateauthor = (updatedAuthor) => {
    // Find the index of the author with the provided authorId
    const authorIndex = listOfAuthors.findIndex(
      (author) => author.author_id === updatedAuthor.author_id
    );

    // Make sure the task exists
    if (authorIndex !== -1) {
      // Create a copy of the author array
      const updatedAuthorsList = [...listOfAuthors];

      // Update the author with the new data
      updatedAuthorsList[authorIndex] = {
        ...updatedAuthorsList[authorIndex],
        name: updatedAuthor.name,
        biography: updatedAuthor.biography,
      };

      setListOfAuthors(updatedAuthorsList);
    }
  };

  const showAuthorDetails = (author) => {
    console.log("inside showAuthorDetails function", author.author_id);
    setSelectedAuthor(author);
    setModalShow(true);
  };

  const editAuthorDetails = (author) => {
    console.log("inside editAuthorDetails authorId::", author.author_id);
    setSelectedAuthor(author);
    console.log("author to edit:", selectedauthor);
    setShowEditAuthorModal(true); //open Edit Author Modal
  };

  if (listOfAuthors.length > 0) {
    if (loading) {
      return <Spinner />;
    }
  }

  return (
    <div className="row">
      <DeleteAlertAuthor
        alertShow={alertShow}
        setAlertShow={setAlertShow}
        listOfAuthors={listOfAuthors}
        setListOfAuthors={setListOfAuthors}
        authoridtodelete={authoridtodelete}
        value="Author"
      />
      <Button
        variant="outline-secondary"
        onClick={() => setAddShow(true)}
        className="shadow border border-dark-subtle fw-bold ms-1 rounded-pill"
        style={{ width: "99%" }}
      >
        ~~~~~~~~~~~~~ADD AN AUTHOR~~~~~~~~~~~~~
      </Button>

      <AddAuthor
        addShow={addShow}
        setAddShow={setAddShow}
        listOfAuthors={listOfAuthors}
        setListOfAuthors={setListOfAuthors}
      />

      <Nav className="justify-content-end mt-3">
        <Nav.Item style={{ width: "auto" }}>
          <Nav.Link eventKey="link-1" style={{ height: "auto" }}>
            {" "}
            <SortAuthorName
              sortAuthorByName={sortAuthorByName}
              setsortAuthorByName={setsortAuthorByName}
              sortAuthorByNameStatus={sortAuthorByNameStatus}
              setSortAuthorByNameStatus={setSortAuthorByNameStatus}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ width: "50%" }}>
          <Nav.Link eventKey="link-2" style={{ height: "auto" }}>
            <Form.Control
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search an Author by Name"
              aria-label="Search an Author by Name"
            />
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <PaginationOnData
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {currentRecords?.length > 0 ? (
        currentRecords.map((author, key) => {
          const imgUrl =
            imgURlArray[key]?.imageUrl ||
            "/images/authors/imagesunavailable.jpg";

          return (
            <div key={key} className="col m-2">
              <Card
                className="border rounded-pill text-center overflow-hidden border-2 border-start-0 border-top-0"
                style={{
                  borderRadius: "0 0 4em 0",
                  maxHeight: "500px",
                  maxWidth: "250px",
                }}
              >
                <Card.Img
                  variant="top"
                  //src="/images/authors/imagesunavailable.jpg"
                  //src={author.image_url}
                  src={imgUrl}
                  alt="no image"
                  style={{ maxHeight: "200px", maxWidth: "250px" }}
                />

                <Card.Body className="bg-dark">
                  <Card.Link
                    id={author.author_id}
                    href="#"
                    onClick={() => {
                      showAuthorDetails(author);
                    }}
                    className="text-light text-capitalize text-center text-decoration-none fs-4"
                  >
                    {author.name}
                  </Card.Link>
                </Card.Body>
                <Card.Footer className="border-0 bg-dark text-center">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      editAuthorDetails(author);
                    }}
                    className="me-3 mb-1 shadow border rounded-pill"
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      setauthoridtodelete(author.author_id);
                      setAlertShow(true);
                    }}
                    className="rounded-circle border fw-bold mb-1"
                  >
                    {" "}
                    X
                  </Button>
                </Card.Footer>
              </Card>

              <AuthorDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                selectedauthor={selectedauthor}
              />

              <EditAuthor
                show={showEditAuthorModal}
                onHide={() => setShowEditAuthorModal(false)}
                selectedauthor={selectedauthor}
                updateauthor={updateauthor}
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
