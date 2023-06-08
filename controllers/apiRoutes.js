const router = require('express').Router();
const path = require('path');
const dbPath = path.join(__dirname, '../db/db.json');
const fs = require('fs');

// GET /api/notes should read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });
  
  // POST /api/notes should receive a new note to save on the request body
  router.post('/notes', (req, res) => {
      console.log("hi there");
      const newNote = req.body;
  
    
      // read the existing notes
      fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
  
        // generate a new ID for the note
        let lastNoteId = notes.length > 0 ? notes[notes.length - 1].id : 0;
        newNote.id = typeof lastNoteId === 'number' ? lastNoteId + 1 : 1;
        notes.push(newNote);
  
        // write the new note to file
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
          if (err) throw err;
          res.json(newNote);
        });
      });
    });
    
  
  router.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    fs.readFile(dbPath, 'utf8', (err, data) => {
      if (err) throw err;
      let notes = JSON.parse(data);
      notes = notes.filter(note => note.id !== noteId);
      fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
        if (err) throw err;
        res.status(200).end();
      });
    });
  });

  module.exports = router;