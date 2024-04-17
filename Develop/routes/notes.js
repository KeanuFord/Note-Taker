const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: crypto.randomUUID(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding note');
    }
  });

notes.delete('/:id', (req, res) => {

    readFromFile('./db/db.json')
        .then((data) => {
            const allNotes = JSON.parse(data);
            
            for (let i=0; i<allNotes.length; i++) {
                if (allNotes[i].id === req.params.id) {
                    allNotes.splice(i, 1);
                    writeToFile('./db/db.json', allNotes);
                }
            }
            res.json(`Item ${req.params.id} has been deleted`);
    });
});

module.exports = notes;