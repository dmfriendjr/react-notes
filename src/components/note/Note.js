import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Editor, EditorState, RichUtils, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import NoteSelector from './NoteSelector';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBold from '@fortawesome/fontawesome-pro-regular/faBold';

const editorStyle = {
  height: '100%'
};

class Note extends React.Component {
  constructor(props){
    super(props);

    this.noteIndex = 0;
    this.state = {editorState: this.props.notesState[this.noteIndex].editorState, notesState: this.props.notesState};
    this.onChange = (editorState) => {
      this.setState({editorState: EditorState.push(editorState, editorState.getCurrentContent())});
    };
    this.onNoteSelected = this.onNoteSelected.bind(this);
  }

  onNoteSelected(noteIndex) {
    this.noteIndex = noteIndex;
    //const newContentState = this.props.notesState[noteIndex].editorState.getCurrentContent();
    //const editorState = EditorState.push(this.state.editorState, newContentState, 'apply-entity');
    //const selection = editorState.getSelection();
    //this.setState({editorState:editorState});
  }

  _onFocusClick() {
    //this.noteEditor.focus();
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onSaveClick() {
   // let updatedNotes = this.props.notesState;
    //updatedNotes[this.noteIndex].editorState = this.state.editorState;
    //this.setState({notesState: updatedNotes});
    this.props.onSaveEditorState(this.state.editorState);
    let updatedNote = this.state.notesState[this.noteIndex];
    updatedNote.editorState = this.state.editor;
  }

  render() {
    return (
      <div className="h-75">
        <div className="row m-3">
          <div className="col">
            <button onClick={this._onBoldClick.bind(this)}><FontAwesomeIcon icon={faBold}/></button>
            <button onClick={this._onSaveClick.bind(this)}>Save</button>
          </div>
        </div>
        <div style={editorStyle} onClick={this._onFocusClick.bind(this)} className="row m-3 border rounded">
          <NoteSelector notes={this.props.notesState} onNoteSelected={this.onNoteSelected} />
          <div className="col">
            <Editor editorState={this.state.notesState[this.noteIndex].editorState} onChange={this.onChange}
            ref={(editor) => this.noteEditor = editor} />
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  editorState: PropTypes.object.isRequired,
  notesState: PropTypes.array.isRequired,
  onSaveEditorState: PropTypes.func.isRequired,
  onSaveNotesState: PropTypes.func.isRequired
};

const mapStateToProps = ({editorState, notesState}) => ({editorState, notesState});

const mapDispatchToProps = (dispatch) => ({
  onSaveEditorState: (editorState, id) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: editorState,
      id
    });
  },
  onSaveNotesState: (noteState, id) => {
    dispatch({
      type: 'UPDATE_NOTES_STATE',
      payload: noteState,
      id
    });
  }
});

const ConnectedNote = connect(mapStateToProps, mapDispatchToProps)(Note);

export default ConnectedNote;