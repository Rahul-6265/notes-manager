import React from 'react';

function Note({ note, index, onDelete, onEdit }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-buttons">
        <button onClick={() => onEdit(index)}>✏️ Edit</button>
        <button onClick={() => onDelete(index)}>🗑️ Delete</button>
      </div>
    </div>
  );
}

export default Note;
