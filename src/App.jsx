import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import Note from "./components/Note";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [message, setMessage] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = (note) => {
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = note;
      setNotes(updatedNotes);
      setMessage("✅ Note updated successfully!");
      setEditIndex(null);
    } else {
      setNotes([note, ...notes]);
      setMessage("✅ Note added successfully!");
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const editNote = (index) => {
    setEditIndex(index);
  };

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <button onClick={() => setDarkMode(!darkMode)} className="mode-toggle">
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>📝 Personal Notes Manager</h1>
      {message && <p className="success-message">{message}</p>}
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
