import React from 'react';
import PropTypes from 'prop-types';

const NoteSelector = ({notes}) => {
  return (
    <div className="col-3 border-right">
    <h1>Notes</h1>
    {notes.map( (note, index) => <li key={index}>{note.name}</li>)}
    </div>
  );
};

NoteSelector.propTypes = {
  notes: PropTypes.array.isRequired
};



/*const mapDispatchToProps = (dispatch) => ({
onSaveEditorState: (editorState) => {
  dispatch({
    type: 'UPDATE_EDITOR_STATE',
    payload: editorState
  });
}
});*/

export default NoteSelector;