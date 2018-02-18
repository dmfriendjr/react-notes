import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as editorActions from '../../actions/editorActions';
import { bindActionCreators } from 'redux';

import NoteListItem from './NoteListItem';

const NoteSelector = ({notes, activeNote, onDeleteNoteClicked, onNewNoteClicked, actions}) => {
  return (
    <div className="d-flex flex-column justify-content-center">
      <button onClick={onNewNoteClicked} className="btn btn-success mb-3">New Note</button>
      <h3 className="text-center">Notes</h3>
      <ul className="list-group">
        {notes.map( 
          (note) => 
            (<NoteListItem 
            key={note.id}
            note={note} 
            isActive={activeNote ? note.id === activeNote.id : false} 
            onNoteSelected={actions.noteSelected} 
            onDeleteNoteClicked={onDeleteNoteClicked} />)
            )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({activeNote: state.editor.activeNote});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(editorActions,dispatch)
});

NoteSelector.propTypes = {
  notes: PropTypes.array.isRequired,
  activeNote: PropTypes.object,
  onDeleteNoteClicked: PropTypes.func.isRequired,
  onNewNoteClicked: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};


const ConnectedNoteSelector = connect(mapStateToProps, mapDispatchToProps)(NoteSelector);

export default ConnectedNoteSelector;