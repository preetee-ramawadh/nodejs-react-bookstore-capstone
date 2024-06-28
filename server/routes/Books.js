const express = require("express");
const router = express.Router();
const { Books } = require("../models");

//GET: Retrieve a list of all books

router.get("/", async (req, res) => {
  try {
    const listOfBooks = await Books.findAll();
    res.json(listOfBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET: Retrieve details of a specific book

router.get("/:id", async (req, res) => {
  try {
    const bookById = await Books.findByPk(req.params.id);
    if (bookById) {
      res.json(bookById);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
      where: { id: req.params.id },
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
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
