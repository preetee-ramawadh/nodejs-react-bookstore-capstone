const express = require("express");
const router = express.Router();
const { Genres } = require("../models");

//GET: Retrieve a list of all Genres

router.get("/", async (req, res) => {
  try {
    const listOfGenres = await Genres.findAll();
    res.json(listOfGenres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET: Retrieve details of a specific Genre

router.get("/:id", async (req, res) => {
  try {
    const genreById = await Genres.findByPk();
    if (genreById) {
      res.json(genreById);
    } else {
      res.status(404).json({ error: "Genre not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST: Add a new Genre

router.post("/", async (req, res) => {
  try {
    const genre = req.body;
    await Genres.create(genre);
    res.status(201).json(genre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
