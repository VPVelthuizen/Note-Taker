const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// HTML routes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API routes
router.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    res.json(notes);
});

router.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();

    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
    notes.push(newNote);

    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

    res.json(newNote);
});

module.exports = router;