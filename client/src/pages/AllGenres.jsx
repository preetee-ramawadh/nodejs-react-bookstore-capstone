import React from "react";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import "holderjs"; // Import holder.js

export default function AllGenres() {
  const [listOfGenres, setListOfGenres] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres data:", error);
      }
    };
    fetchGenresData();
  }, []);

  if (listOfGenres.length > 0) {
    if (loading) {
      return <Spinner />;
    }
  }

  return (
    <div className="row">
      {listOfGenres?.length > 0 ? (
        listOfGenres.map((genre, key) => {
          return (
            <Card
              key={key}
              style={{ width: "25rem" }}
              className="col m-2 shadow"
            >
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body className="text-center text-success">
                <Card.Title>{genre.genre_name}</Card.Title>
              </Card.Body>
            </Card>
          );
        })
      ) : (
        <h1>No Genre Present!!</h1>
      )}
    </div>
  );
}
