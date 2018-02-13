import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {EditorState} from 'draft-js';
import NoteSelector from './NoteSelector';
import NoteEditor from './NoteEditor';
import * as editorActions from '../../actions/editorActions';
import { bindActionCreators } from 'redux';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({activeNoteId: 0});
    this.onChange = (editorState) => this.setState({editorState: editorState});
    this.onNoteSelected = this.onNoteSelected.bind(this);
    this.onNoteSaved = this.onNoteSaved.bind(this);
    this.onNoteTitleChanged = this.onNoteTitleChanged.bind(this);
    this.onNoteCreated = this.onNoteCreated.bind(this);
  }

  onNoteSelected(noteId) {
    this.setState({editorState: this.props.notes[noteId].editorState, activeNoteId: noteId, noteTitle: this.props.notes[noteId].name});
  }

  onNoteCreated() {
    this.props.onNoteCreated(this.props.notes.length);
  }

  onNoteTitleChanged(state) {
    this.setState({noteTitle: state.target.value});
  }

  onNoteSaved() {
    this.props.actions.saveNote({id: this.state.activeNoteId, editorState: this.state.editorState, name: this.state.noteTitle});
  }

  render() {
    let editorDisplay = null;

    if (this.props.notes.length !== 0) {
      editorDisplay = (<NoteEditor editorState={this.state.editorState || this.props.notes[this.state.activeNoteId].editorState}
      noteId={this.state.activeNoteId} 
      noteTitle={this.props.notes[this.state.activeNoteId].name}
      onNoteSaved={this.onNoteSaved} 
      onNoteTitleChanged={this.onNoteTitleChanged}
      onNoteChanged={this.onChange} />);    
    } else {
      editorDisplay = <h1 className="text-center">Create a note to start!</h1>;
    }

    return(
    <div className="row">
      <div className="col-2 ml-2">
        <NoteSelector notes={this.props.notes} activeNoteId={this.state.activeNoteId} onNoteSelected={this.onNoteSelected} onNoteCreated={this.props.actions.createNewNote} />
      </div>
      <div className="col-9 ml-2">
        {editorDisplay}
      </div>
    </div>
    );
  }
}

NotePage.propTypes = {
  notes: PropTypes.array.isRequired,
  onNoteCreated: PropTypes.func.isRequired,
  onSaveNotesState: PropTypes.func.isRequired,
  actions:  PropTypes.object.isRequired
};

const mapStateToProps = ({notes}) => ({notes});

const mapDispatchToProps = (dispatch) => ({
  onSaveNotesState: (noteState) => {
    dispatch({
      type: 'SAVE_NOTES_STATE',
      payload: noteState 
    });
  },
  onNoteCreated: (id) => {
    dispatch({
      type: 'CREATE_NEW_NOTE',
      payload: {id: id, name: 'Untitled', editorState: EditorState.createEmpty()}
    });
  },
  actions: bindActionCreators(editorActions,dispatch)
});

const ConnectedNotePage = connect(mapStateToProps, mapDispatchToProps)(NotePage);

export default ConnectedNotePage;