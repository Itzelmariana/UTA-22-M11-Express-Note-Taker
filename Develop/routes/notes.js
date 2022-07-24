const notes = require("express").Router();
const uuidv4 = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the feedback
notes.get("/", (req, res) =>
  readFromFile("db/db.json").then((data) => res.json(JSON.parse(data)))
);

notes.post("/", (req, res) => {
  console.log("Test");
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    note_id: uuidv4(),
  };

  readAndAppend(newNote, "./db/db.json");
  res.json(newNote);
});

// GET Route for a specific note
notes.get("/:id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

//DELETE Route for a specific tip
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.note_id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;
