const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// API routes
router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    let notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    notes = notes.filter(note => note.id !== noteId);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.sendStatus(204);
});

module.exports = router;