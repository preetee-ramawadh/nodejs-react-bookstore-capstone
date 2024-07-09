import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import BookDetails from "./BookDetails";
import AddBook from "./AddBook";
import EditBook from "./EditBook";
import DeleteAlertBook from "./DeleteAlertBook";
import SortBookTitle from "./SortBookTitle";
import SortBookPrice from "./SortBookPrice";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import EditIcon from "./EditIcon";

export default function AllBooks() {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedbook, setSelectedBook] = useState({});

  const [modalShow, setModalShow] = useState(false); //modal to show book details

  const [alertShow, setAlertShow] = useState(false);

  const [booktodelete, setbooktodelete] = useState(false);

  const [addShow, setAddShow] = useState(false); //form to add a new book

  const [modalEditShow, setModalEditShow] = useState(false); //modal to edit book detail

  const [sortBookByPrice, setsortBookByPrice] = useState([]);

  const [sortBookByPriceStatus, setSortBookByPriceStatus] = useState(true);

  const [sortBookByName, setsortBookByName] = useState([]);

  const [sortBookByNameStatus, setSortBookByNameStatus] = useState(true);

  const [search, setSearch] = useState("");

  const [searchByAuthor, setSearchByAuthor] = useState("");

  useEffect(() => {
    fetchBooksData();
  }, []);

  const fetchBooksData = async () => {
    try {
      const response = await fetch("http://localhost:5000/books");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log("jsonData", jsonData);
      setListOfBooks(jsonData);
      setsortBookByPrice(jsonData);
      setsortBookByName(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books data:", error);
    }
  };

  if (listOfBooks.length > 0) {
    if (loading) {
      return <Spinner />;
    }
  }

  //function to pass to child component to update author
  const updatebook = (updatedBook) => {
    // Find the index of the task with the provided taskId
    const bookIndex = listOfBooks.findIndex(
      (book) => book.book_id === updatedBook.book_id
    );

    // Make sure the task exists
    if (bookIndex !== -1) {
      // Create a copy of the author array
      const updatedBooksList = [...listOfBooks];

      // Update the author with the new data
      updatedBooksList[bookIndex] = {
        ...updatedBooksList[bookIndex],
        title: updatedBook.title,
        author_id: updatedBook.author_id,
        genre_id: updatedBook.genre_id,
        price: updatedBook.price,
        publication_date: updatedBook.publication_date,
      };

      setListOfBooks(updatedBooksList);
    }
  };

  const showBookDetails = (book) => {
    console.log("inside showBookDetails function", book.book_id);
    setSelectedBook(book);
    setModalShow(true);
  };

  const editBookDetails = (book) => {
    console.log("inside editBookDetails function --bookid::", book.bookId);
    setSelectedBook(book);
    setModalEditShow(true);
  };

  const addBook = () => {
    setAddShow(true);
  };

  return (
    <div className="row">
      <DeleteAlertBook
        alertShow={alertShow}
        setAlertShow={setAlertShow}
        listOfBooks={listOfBooks}
        setListOfBooks={setListOfBooks}
        booktodelete={booktodelete}
      />
      <Button
        variant="outline-secondary border-2"
        onClick={() => addBook()}
        className="border border-dark-subtle shadow fw-bold ms-1"
        style={{ width: "99%" }}
      >
        ~~~~~~~~~~~~~ADD A BOOK~~~~~~~~~~~~~
      </Button>

      <AddBook
        addShow={addShow}
        setAddShow={setAddShow}
        listOfBooks={listOfBooks}
        setListOfBooks={setListOfBooks}
      />

      <Nav className="justify-content-end mt-3">
        <Nav.Item style={{ width: "auto" }}>
          <Nav.Link style={{ height: "auto" }}>
            <SortBookPrice
              sortBookByPrice={sortBookByPrice}
              setsortBookByPrice={setsortBookByPrice}
              sortBookByPriceStatus={sortBookByPriceStatus}
              setSortBookByPriceStatus={setSortBookByPriceStatus}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ width: "auto" }}>
          <Nav.Link eventKey="link-1" style={{ height: "auto" }}>
            {" "}
            <SortBookTitle
              sortBookByName={sortBookByName}
              setsortBookByName={setsortBookByName}
              sortBookByNameStatus={sortBookByNameStatus}
              setSortBookByNameStatus={setSortBookByNameStatus}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item style={{ width: "50%" }}>
          <Nav.Link eventKey="link-2" style={{ height: "auto" }}>
            <Form.Control
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder="Search a Book by Title"
              aria-label="Search Book by title"
            />
          </Nav.Link>
        </Nav.Item>

        {/* <Nav.Item style={{ width: "25%" }}>
          <Nav.Link eventKey="link-3" style={{ height: "auto" }}>
            <Form.Control
              onChange={(e) => {
                setSearchByAuthor(e.target.value);
              }}
              placeholder="Search Books by Author"
              aria-label="Search Book by Author"
            />
          </Nav.Link>
        </Nav.Item> */}
      </Nav>

      {listOfBooks?.length > 0 ? (
        listOfBooks
          .filter((book) => {
            return search.toLowerCase() === ""
              ? book
              : book.title.toLowerCase().includes(search);
          })
          .map((book, key) => {
            return (
              <div key={key} className="d-flex col m-2">
                <Card
                  style={{ borderRadius: "0 0 4em 0" }}
                  className="border shadow overflow-hidden"
                >
                  <Card.Img
                    variant="top"
                    src="/images/books/atomic-habbits.jpeg"
                    alt="no image"
                    style={{ maxHeight: "300px" }}
                  />
                  <Card.Body className="text-center bg-dark">
                    <Card.Link
                      id={book.book_id}
                      href="#"
                      onClick={() => {
                        showBookDetails(book);
                      }}
                      className="text-light text-capitalize text-decoration-none fs-4"
                    >
                      {book.title}
                    </Card.Link>
                  </Card.Body>
                  <Card.Footer className="border-0 text-center bg-dark">
                    <Button
                      variant="outline-primary"
                      onClick={() => editBookDetails(book)}
                      className="me-3 mb-1 shadow border rounded-pill"
                    >
                      <EditIcon />
                    </Button>

                    <Button
                      variant="outline-danger"
                      //onClick={() => deleteBook(book.book_id)}
                      onClick={() => {
                        setbooktodelete(book.book_id);
                        setAlertShow(true);
                      }}
                      className="rounded-circle border fw-bold"
                    >
                      {" "}
                      X
                    </Button>
                  </Card.Footer>
                </Card>

                <BookDetails
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  selectedbook={selectedbook}
                />

                <EditBook
                  show={modalEditShow}
                  onHide={() => setModalEditShow(false)}
                  selectedbook={selectedbook}
                  updatebook={updatebook}
                />
              </div>
            );
          })
      ) : (
        <h1>No books available!!</h1>
      )}
    </div>
  );
}
