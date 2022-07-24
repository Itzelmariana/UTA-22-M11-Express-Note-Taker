const db = require("express").Router();
//const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for retrieving  information
db.get("/", (req, res) => {
  readFromFile("../db/db.json").then((data) => res.json(JSON.parse(data)));
});


// // POST Route for a error logging
// db.post("/", (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { title, text} = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       //id: uuidv4(),
//     };

//     readAndAppend(newNote, "../db/db.json");

//     const response = {
//       status: "success",
//       body: newNote,
//     };

//     res.json(response);
//   } else {
//     res.json("Error in posting feedback");
//   }
// });

// db.get("/:tip_id", (req, res) => {
//   const tipId = req.params.tip_id;
//   readFromFile("./db/tips.json")
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((tip) => tip.tip_id === tipId);
//       return result.length > 0
//         ? res.json(result)
//         : res.json("No tip with that ID");
//     });
// });

// DELETE Route for a specific tip
// tips.delete("/:tip_id", (req, res) => {
//   const tipId = req.params.tip_id;
//   readFromFile("./db/tips.json")
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all tips except the one with the ID provided in the URL
//       const result = json.filter((tip) => tip.tip_id !== tipId);

//       // Save that array to the filesystem
//       writeToFile("./db/tips.json", result);

//       // Respond to the DELETE request
//       res.json(`Item ${tipId} has been deleted 🗑️`);
//     });
// });

module.exports = db;
