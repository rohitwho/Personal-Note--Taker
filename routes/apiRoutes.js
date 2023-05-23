const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));

})

router.get("/api/notes/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
})

router.post("/api/notes", (req, res) => {
  console.log(req.body);
  const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

  // Read the existing data from the JSON file
  const db = JSON.parse(fs.readFileSync(dbFilePath));

  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  db.push(newNote);

  // Write the updated data back to the JSON file
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));

  // Respond to the client with a success message or appropriate status code
  res.status(200).json({ message: 'Note added successfully' });
});


router.delete("/api/notes/:id", (req, res) => {
  const dbFilePath = path.join(__dirname, '../db/db.json');
  const id = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading database file:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    let db = JSON.parse(data);

    const dbNotes = db.filter((note) => note.id !== id);
    const deletedNote = db.find((note) => note.id === id);

    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }

    db = dbNotes;

    fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
      if (err) {
        console.error('Error updating database file:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.json({ message: 'Note deleted successfully' });
    });
  });
});


module.exports = router




