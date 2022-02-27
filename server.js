//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

//set up express app
const app = express();
// set up port
const PORT = process.env.PORT || 3001;


// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//SET ROUTES FOR APIS
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// ADD NEW NOTES
app.post("/api/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  const newNotes = req.body;
  newNotes.id = uuid.v4();
  notes.push(newNotes);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.json(notes);
});

//DELETE NOTES
app.delete("/api/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  const deleteNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

//CALL HOME
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
//CALL NOTES
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

//START LISTEN
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
