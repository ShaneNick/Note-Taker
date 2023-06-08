const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './develop/public')));

const dbPath = path.join(__dirname, './develop/db/db.json');

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile('notes.html', { root: path.join(__dirname, './develop/public') });
});


// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST /api/notes should receive a new note to save on the request body
app.post('/api/notes', (req, res) => {
    console.log("hi there");
    const newNote = req.body;

    // GET * should return the index.html file
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, './develop/public') });
});
  
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
  

app.delete('/api/notes/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
