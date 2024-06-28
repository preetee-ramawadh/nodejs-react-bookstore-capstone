const express = require("express");
const router = express.Router();
const { Authors } = require("../models");

//GET: Retrieve a list of all authors

router.get("/", async (req, res) => {
  try {
    const listOfAuthors = await Authors.findAll();
    res.json(listOfAuthors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET: Retrieve details of a specific author

router.get("/:id", async (req, res) => {
  try {
    const authorById = await Authors.findByPk();
    if (authorById) {
      res.json(authorById);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST: Add a new author

router.post("/", async (req, res) => {
  try {
    const author = req.body;
    await Authors.create(author);
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//PUT: Update details of an existing author

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Authors.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedAuthor = await Authors.findByPk(req.params.id);
      res.json(updatedAuthor);
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a specific author

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Authors.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Author not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
