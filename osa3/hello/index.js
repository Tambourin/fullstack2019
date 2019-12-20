const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const port = 3001;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('Täällä ollaan'); 
});

app.get('/notes', (request, response) => {
  response.json(notes);
});

app.get('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find(note => note.id === id);
  if (note) {
    response.send(note);
  } else {
    response.status(404).end();
  }
    
});

app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

app.post('/notes', (request, response) => {
  const note = request.body;
  console.log(note);
  response.status(201);
  response.json(note);
});

app.listen(port);