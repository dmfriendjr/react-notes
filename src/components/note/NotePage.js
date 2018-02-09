import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import NoteSelector from './NoteSelector';
import NoteEditor from './NoteEditor';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({editorState: this.props.notesState[0].editorState, activeNoteId: 0, noteTitle: this.props.notesState[0].name});
    this.onChange = (editorState) => this.setState({editorState: editorState});
    this.onNoteSelected = this.onNoteSelected.bind(this);
    this.onNoteSaved = this.onNoteSaved.bind(this);
    this.onNoteTitleChanged = this.onNoteTitleChanged.bind(this);
  }

  onNoteSelected(noteId) {
    console.log('Note selected:', noteId);
    this.setState({editorState: this.props.notesState[noteId].editorState, activeNoteId: noteId, noteTitle: this.props.notesState[noteId].name});
  }

  onNoteTitleChanged(state) {
    this.setState({noteTitle: state.target.value});
  }

  onNoteSaved() {
    console.log('Saving a note');
    this.props.onSaveNotesState({id: this.state.activeNoteId, editorState: this.state.editorState, name: this.state.noteTitle});
  }


  render() {
    return(
    <div>
      <div className="col-3">
        <NoteSelector notes={this.props.notesState} onNoteSelected={this.onNoteSelected} />
      </div>
      <div className="col-9">
        <NoteEditor editorState={this.state.editorState}
         noteId={this.state.activeNoteId} 
         noteTitle={this.state.noteTitle}
         onNoteSaved={this.onNoteSaved} 
         onNoteTitleChanged={this.onNoteTitleChanged}
         onNoteChanged={this.onChange} />
      </div>
    </div>
    );
  }
}

NotePage.propTypes = {
  notesState: PropTypes.array.isRequired,
  onSaveNotesState: PropTypes.func.isRequired
};

const mapStateToProps = ({notesState}) => ({notesState});

const mapDispatchToProps = (dispatch) => ({
  onSaveNotesState: (noteState) => {
    dispatch({
      type: 'SAVE_NOTES_STATE',
      payload: noteState 
    });
  }
});

const ConnectedNotePage = connect(mapStateToProps, mapDispatchToProps)(NotePage);

export default ConnectedNotePage;