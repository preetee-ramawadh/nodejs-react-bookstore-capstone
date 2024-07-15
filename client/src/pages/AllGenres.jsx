import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import GenreDetails from "./GenreDetails";
import AddGenre from "./AddGenre";
import Button from "react-bootstrap/Button";
import PaginationOnData from "./PaginationOnData";
import SortGenreName from "./SortGenreName";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";

export default function AllGenres({
  currentPage,
  setCurrentPage,
  recordsPerPage,
  filteredRecords,
  setFilteredRecords,
  search,
  setSearch,
}) {
  const [listOfGenres, setListOfGenres] = useState([]);

  const [selectedgenre, setSelectedgenre] = useState({});

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

  const [addShow, setAddShow] = useState(false);

  const [imgURlArray, setImgURLArray] = useState([]);

  const [sortGenreByName, setsortGenreByName] = useState([]);

  const [sortGenreByNameStatus, setSortGenreByNameStatus] = useState(true);

  useEffect(() => {
    const fetchGenresData = async () => {
      try {
        const response = await fetch("http://localhost:5000/genres");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        console.log("jsonData", jsonData);
        setListOfGenres(jsonData);

        // Create a dictionary of images keyed by genre ID
        const imgURLDictionary = jsonData.reduce((acc, genre) => {
          acc[genre.genre_id] = genre.image_url;
          return acc;
        }, {});

        setImgURLArray(imgURLDictionary);
        console.log("genres imgURlArray:", imgURLDictionary);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres data:", error);
        setLoading(false); // Ensure loading is false on error
      }
    };
    fetchGenresData();
  }, []);

  //filtering data
  useEffect(() => {
    const filtered = listOfGenres.filter((genre) => {
      return search.toLowerCase() === ""
        ? genre
        : genre.genre_name.toLowerCase().includes(search);
    });
    setFilteredRecords(filtered);
    setsortGenreByName(filtered);
  }, [search, listOfGenres]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const handleShowGenreBooks = async (genreId) => {
    console.log("inside showGenreBooks: " + genreId);
    setModalShow(true);

    try {
      const response = await fetch(`http://localhost:5000/genres/${genreId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const selectedGenreData = await response.json();
      console.log("selectedGenreData::", selectedGenreData);
      setSelectedgenre(selectedGenreData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching genres data:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row">
      <div className="fixed-container">
        <Button
          variant="secondary border-dark"
          onClick={() => setAddShow(true)}
          className="border border-dark shadow fw-bold ms-1 rounded-pill"
          style={{ width: "99%" }}
        >
          ~~~~~~~~~~~~~ADD A GENRE~~~~~~~~~~~~~
        </Button>
        <AddGenre
          addShow={addShow}
          setAddShow={setAddShow}
          listOfGenres={listOfGenres}
          setListOfGenres={setListOfGenres}
        />

        <Nav className="justify-content-end mt-3">
          <Nav.Item style={{ width: "auto" }}>
            <Nav.Link eventKey="link-1" style={{ height: "auto" }}>
              {" "}
              <SortGenreName
                sortGenreByName={sortGenreByName}
                setsortGenreByName={setsortGenreByName}
                sortGenreByNameStatus={sortGenreByNameStatus}
                setSortGenreByNameStatus={setSortGenreByNameStatus}
              />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ width: "50%" }}>
            <Nav.Link eventKey="link-2" style={{ height: "auto" }}>
              <Form.Control
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                placeholder="Search a Genre by Name"
                aria-label="Search an Genre by Name"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <PaginationOnData
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      {currentRecords?.length > 0 ? (
        currentRecords.map((genre, key) => {
          const imgUrl =
            imgURlArray[genre.genre_id] ||
            "/images/genres/genreimageunavailable.jpg";

          return (
            <div className="col mt-3">
              <Card
                key={key}
                className="bg-dark border border-2 border-start-0 border-top-0 mt-3"
                style={{ height: "270px", width: "240px" }}
              >
                <Card.Img
                  variant="top"
                  src={imgUrl}
                  alt="genre specific image"
                  style={{ height: "200px" }}
                />
                <Card.Body className="text-center bg-secondary">
                  <Card.Title>
                    <Card.Link
                      id={genre.genre_id}
                      href="#"
                      onClick={() => {
                        handleShowGenreBooks(genre.genre_id);
                      }}
                      className="text-light text-capitalize text-decoration-none fs-4"
                    >
                      {genre.genre_name}
                    </Card.Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <h1>No Genre Present!!</h1>
      )}

      <GenreDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedgenre={selectedgenre}
      />
    </div>
  );
}
