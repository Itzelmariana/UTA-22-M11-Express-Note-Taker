const express = require("express");

const dbRouter = require("./db");
const notesRouter = require("./notes");

const app = express();

app.use("/db", dbRouter);
app.use("/notes", notesRouter);

module.exports = app;
