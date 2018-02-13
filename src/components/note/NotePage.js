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
    this.onNoteSaved = this.onNoteSaved.bind(this);
    this.onNoteTitleChanged = this.onNoteTitleChanged.bind(this);
    this.onNoteCreated = this.onNoteCreated.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeNote && nextProps.activeNote != this.props.activeNote) {
      this.setState({editorState: nextProps.activeNote.editorState});
    }
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

    if (this.props.activeNote) {
      editorDisplay = (<NoteEditor editorState={this.state.editorState || this.props.activeNote.editorState}
      noteId={this.state.activeNoteId} 
      noteTitle={this.props.notes[this.state.activeNoteId].name}
      onNoteSaved={this.onNoteSaved} 
      onNoteTitleChanged={this.onNoteTitleChanged}
      onNoteChanged={this.onChange} />);    
    } else {
      editorDisplay = <h1 className="text-center">Select a note</h1>;
    }

    return(
    <div className="row">
      <div className="col-2 ml-2">
        <NoteSelector notes={this.props.notes} onNoteCreated={this.props.actions.createNewNote} />
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
  activeNote: PropTypes.object,
  onNoteCreated: PropTypes.func.isRequired,
  onSaveNotesState: PropTypes.func.isRequired,
  actions:  PropTypes.object.isRequired
};

const mapStateToProps = ({notes, activeNote}) => ({notes, activeNote});

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