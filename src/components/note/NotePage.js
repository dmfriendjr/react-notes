import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import NoteSelector from './NoteSelector';
import NoteEditor from './NoteEditor';
import * as editorActions from '../../actions/editorActions';
import { bindActionCreators } from 'redux';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.activeNote ? 
      {note: Object.assign({}, props.activeNote), editorState: EditorState.createWithContent(convertFromRaw(props.activeNote.content))} 
      : {note: undefined};
    this.onChange = (editorState) => this.setState({editorState: editorState});
    this.onNoteSaved = this.onNoteSaved.bind(this);
    this.onNoteTitleChanged = this.onNoteTitleChanged.bind(this);
    this.onDeleteNoteClicked = this.onDeleteNoteClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeNote && nextProps.activeNote != this.props.activeNote) {
      let noteState = Object.assign({}, nextProps.activeNote);
      this.setState({note: noteState, editorState: EditorState.createWithContent(convertFromRaw(nextProps.activeNote.content))});
    }
  }

  onNoteTitleChanged(state) {
    this.setState({noteTitle: state.target.value});
  }

  onNoteSaved() {
    let saveState = Object.assign({}, this.state.note);
    saveState.content = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.actions.saveNote(saveState);
  }

  onDeleteNoteClicked(noteId) {
    this.props.actions.deleteNote(noteId);
  }
  render() {
    let editorDisplay = null;

    if (this.state.editorState) {
      editorDisplay = (<NoteEditor editorState={this.state.editorState}
      noteId={this.state.note.id} 
      noteTitle={this.state.note.name}
      onNoteSaved={this.onNoteSaved} 
      onNoteTitleChanged={this.onNoteTitleChanged}
      onNoteChanged={this.onChange} />);    
    } else {
      editorDisplay = <h1 className="text-center">Select a note</h1>;
    }

    return(
    <div className="row">
      <div className="col-2 ml-2">
        <NoteSelector notes={this.props.notes} onDeleteNoteClicked={this.onDeleteNoteClicked} onNoteCreated={this.props.actions.createNewNote} />
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
  actions:  PropTypes.object.isRequired
};

const mapStateToProps = ({notes, activeNote}) => ({notes, activeNote});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(editorActions,dispatch)
});

const ConnectedNotePage = connect(mapStateToProps, mapDispatchToProps)(NotePage);

export default ConnectedNotePage;