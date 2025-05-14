import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import Note from './components/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([note, ...notes]);
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>📝 Personal Notes Manager</h1>
      <NoteForm
        onAdd={addOrUpdateNote}
        editData={editIndex !== null ? notes[editIndex] : null}
      />
      {notes.map((note, index) => (
        <Note
          key={index}
          note={note}
          index={index}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
    </div>
  );
}

export default App;
