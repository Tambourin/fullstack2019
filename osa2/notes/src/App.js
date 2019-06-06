import React, { useState, useEffect } from "react";
import axios from "axios";

const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>
        {note.important === true ? "mark as not important" : "mark important"}
      </button>
    </li>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then(response => {
      setNotes(response.data);
    });
  }, []);

  const addNote = event => {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: true
    };
    axios.post("http://localhost:3001/notes", newNoteObject).then(response => {
      setNotes(notes.concat(response.data));
      setNewNote("");
    });
  };

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id);
    const copyOfNote = { ...note, important: !note.important };

    axios
      .put(`http://localhost:3001/notes/${id}`, copyOfNote)
      .then(response => {
        setNotes(notes.map(note => (note.id !== id ? note : response.data)));
      });
  };

  return (
    <>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={event => {
            setNewNote(event.target.value);
          }}
        />
      </form>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportance(note.id)}
        />
      ))}
    </>
  );
};

export default App;
