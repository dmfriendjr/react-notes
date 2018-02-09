import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NoteSelector = ({notes, activeNoteId, onNoteCreated, onNoteSelected}) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <h1 className="text-center">Notes</h1>
      <button onClick={onNoteCreated} className="btn btn-success">New Note</button>
      <ul className="list-group">
        {notes.map( (note) => <li className={classnames('list-group-item', {active: note.id === activeNoteId})} key={note.id} onClick={() => onNoteSelected(note.id)}>{note.name}</li>)}
      </ul>
    </div>
  );
};

NoteSelector.propTypes = {
  notes: PropTypes.array.isRequired,
  activeNoteId: PropTypes.number.isRequired,
  onNoteCreated: PropTypes.func.isRequired,
  onNoteSelected: PropTypes.func.isRequired
};

export default NoteSelector;