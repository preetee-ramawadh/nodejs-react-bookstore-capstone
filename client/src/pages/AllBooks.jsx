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
        className="row"
        alertShow={alertShow}
        setAlertShow={setAlertShow}
        listOfBooks={listOfBooks}
        setListOfBooks={setListOfBooks}
        booktodelete={booktodelete}
      />
      <Button
        variant="outline-dark"
        onClick={() => addBook()}
        className="shadow border border-secondary fw-bold"
      >
        ~~~~~~~~~~~~~ADD BOOK~~~~~~~~~~~~~
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
                <Card style={{ width: "18rem" }} className="shadow">
                  <Card.Img
                    variant="top"
                    src="/images/books/atomic-habbits.jpeg"
                    alt="no image"
                    style={{ maxHeight: "300px" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Link
                      id={book.book_id}
                      href="#"
                      onClick={() => {
                        showBookDetails(book);
                      }}
                      className="text-primary"
                    >
                      {book.title}
                    </Card.Link>
                  </Card.Body>
                  <Card.Footer className="text-end">
                    <Button
                      variant="primary"
                      onClick={() => editBookDetails(book)}
                      className="me-2 shadow btn btn-primary border border-secondary"
                    >
                      EDIT
                    </Button>

                    <Button
                      variant="primary"
                      //onClick={() => deleteBook(book.book_id)}
                      onClick={() => {
                        setbooktodelete(book.book_id);
                        setAlertShow(true);
                      }}
                      className="shadow btn btn-danger border border-secondary"
                    >
                      DELETE
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
