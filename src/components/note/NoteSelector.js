import React from 'react';
import PropTypes from 'prop-types';

const NoteSelector = ({notes, onNoteSelected}) => {
  return (
    <div className="col-3 border-right">
    <h1>Notes</h1>
    <ul>
    {notes.map( (note) => <li key={note.id} onClick={() => onNoteSelected(note.id)}>{note.name}</li>)}
    </ul>
    </div>
  );
};

NoteSelector.propTypes = {
  notes: PropTypes.array.isRequired,
  onNoteSelected: PropTypes.func.isRequired
};

export default NoteSelector;