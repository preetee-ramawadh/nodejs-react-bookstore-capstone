const express = require("express");
const router = express.Router();
const { Books, Authors, Genres } = require("../models");

//GET: Retrieve a list of all books

router.get("/", async (req, res) => {
  try {
    const listOfBooks = await Books.findAll({
      include: [
        {
          model: Authors,
          attributes: ["author_id", "name"], // Specify the attributes you want to retrieve from Author table
        },
        {
          model: Genres,
          attributes: ["genre_id", "genre_name"], // Specify the attributes you want to retrieve from Genre table
        },
      ],
    });
    res.json(listOfBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET: Retrieve details of a specific book
/*
router.get("/:id", async (req, res) => {
  try {
    const bookById = await Books.findByPk(req.params.id, {
      include: {
        model: Authors,
        attributes: ["author_id", "name"], // Specify the attributes you want to retrieve from Author table
      },
    });
    if (bookById) {
      res.json(bookById);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); */

//POST: Add a new book

router.post("/", async (req, res) => {
  try {
    const book = req.body;
    await Books.create(book);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//PUT: Update details of an existing book

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Books.update(req.body, {
      where: { book_id: req.params.id },
    });
    if (updated) {
      const updatedBook = await Books.findByPk(req.params.id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a specific book

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Books.destroy({
      where: { book_id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Book deleted successfully" });
      res.status(204).end();
      console.log("Record deleted successfully");
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
