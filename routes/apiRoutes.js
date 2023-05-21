const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

// router.get("/notes",(req,res)=>{
//     res.sendFile(path.join(__dirname,"../db/db.json"));

// })


router.post("/notes", (req, res) => {
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
    fs.writeFileSync(dbFilePath, JSON.stringify(db));

    // Respond to the client with a success message or appropriate status code
    res.status(200).json({ message: 'Note added successfully' });
});

router.delete("/notes/:id", (req, res) => {
    const db = require("../db/db.json");
    const id = req.params.id;
    const dbNotes = db.filter((note) => note.id !== id);
    db.splice(id, 1);
    res.json(dbNotes);

});

module.exports = router