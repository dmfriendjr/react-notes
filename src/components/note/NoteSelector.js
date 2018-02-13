import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as editorActions from '../../actions/editorActions';
import { bindActionCreators } from 'redux';

const NoteSelector = ({notes, activeNote, onNoteCreated, actions}) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <button onClick={onNoteCreated} className="btn btn-success mb-3">New Note</button>
      <h3 className="text-center">Notes</h3>
      <ul className="list-group">
        {notes.map( 
          (note) => 
          (<li className={classnames('list-group-item', 
            {active: note === activeNote})} 
            key={note.id} 
            onClick={() => actions.noteSelected(note.id)}>{note.name}</li>))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({activeNote}) => ({activeNote});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(editorActions,dispatch)
});

NoteSelector.propTypes = {
  notes: PropTypes.array.isRequired,
  activeNote: PropTypes.object,
  onNoteCreated: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

const ConnectedNoteSelector = connect(mapStateToProps, mapDispatchToProps)(NoteSelector);

export default ConnectedNoteSelector;