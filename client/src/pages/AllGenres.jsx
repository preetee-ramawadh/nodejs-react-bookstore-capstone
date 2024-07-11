import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import "holderjs"; // Import holder.js
import GenreDetails from "./GenreDetails";
import AddGenre from "./AddGenre";
import Button from "react-bootstrap/Button";

export default function AllGenres() {
  const [listOfGenres, setListOfGenres] = useState([]);

  const [selectedgenre, setSelectedgenre] = useState({});

  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);

  const [addShow, setAddShow] = useState(false);

  const [imgURlArray, setImgURLArray] = useState([]);

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

        /**populate images from genres table in an imgURL array */

        // Extract or transform data from the dataset
        const imgURL = jsonData.map((genre) => ({
          id: genre.genre_id,
          imageUrl: genre.image_url,
        }));

        // Update the state with the constructed array
        setImgURLArray(imgURL);
        console.log("Genres imgURlArray:", imgURlArray);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres data:", error);
      }
    };
    fetchGenresData();
  }, []);

  const showGenreBooks = async (genreId) => {
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

  if (listOfGenres.length > 0) {
    if (loading) {
      return <Spinner />;
    }
  }

  return (
    <div className="row">
      <Button
        variant="outline-secondary"
        onClick={() => setAddShow(true)}
        className="shadow border border-secondary fw-bold ms-1"
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

      {listOfGenres?.length > 0 ? (
        listOfGenres.map((genre, key) => {
          const imgUrl =
            imgURlArray[key]?.imageUrl ||
            "/images/genres/genreimageunavailable.jpg";
          return (
            <div key={key} className="d-flex col m-2">
              <Card className="shadow">
                <Card.Img
                  variant="top"
                  src={imgUrl}
                  alt="genre specific image"
                  style={{ maxHeight: "300px" }}
                />
                <Card.Body className="text-center text-success bg-dark">
                  <Card.Title>
                    <Card.Link
                      id={genre.genre_id}
                      href="#"
                      onClick={() => {
                        showGenreBooks(genre.genre_id);
                      }}
                      className="text-light text-capitalize text-decoration-none fs-4"
                    >
                      {genre.genre_name}
                    </Card.Link>
                  </Card.Title>
                </Card.Body>
                <Card.Footer></Card.Footer>
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
