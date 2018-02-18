import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import NoteSelector from './NoteSelector';
import NoteEditor from './NoteEditor';
import * as editorActions from '../../actions/editorActions';
import { bindActionCreators, compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.activeNote ? 
      {note: Object.assign({}, props.activeNote), 
             editorState: EditorState.createWithContent(convertFromRaw(props.activeNote.content))} 
      : {note: null};
    this.onChange = (editorState) => this.setState({editorState: editorState});
    this.onNoteSaved = this.onNoteSaved.bind(this);
    this.onNoteTitleChanged = this.onNoteTitleChanged.bind(this);
    this.onDeleteNoteClicked = this.onDeleteNoteClicked.bind(this);
    this.onNewNoteClicked = this.onNewNoteClicked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isEmpty && !nextProps.auth.isEmpty) {
      this.props.actions.loadNotes(nextProps.firebase, nextProps.auth.uid);
    }
    if (nextProps.activeNote === null) {
      this.setState({note: null, editorState: null});
    }
    else if (nextProps.activeNote && nextProps.activeNote != this.props.activeNote) {
      let noteState = Object.assign({}, nextProps.activeNote);
      this.setState({note: noteState, editorState: EditorState.createWithContent(convertFromRaw(nextProps.activeNote.content))});
    }
  }

  onNewNoteClicked() {
    this.props.actions.createNewNote(this.props.firebase, this.props.auth.uid);
  }

  onNoteTitleChanged(title) {
    let noteState = Object.assign({}, this.state.note);
    noteState.name = title;
    this.setState({note: noteState});
  }

  onNoteSaved() {
    let saveState = Object.assign({}, this.state.note);
    saveState.content = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.actions.saveNote(saveState, this.props.firebase, this.props.auth.uid);
  }

  onDeleteNoteClicked(noteId) {
    this.props.actions.deleteNote(noteId, this.props.firebase, this.props.auth.uid);
  }

  render() {
    let editorDisplay = null;
    if (this.props.auth.isEmpty) {
      return (
        <div className="row">
          <div className="col-12 text-center">
            <h1>Please Login To Use Application</h1>
          </div>
        </div>
      );
    } else {
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
        <div className="col-md-2 col-12 ml-2">
          <NoteSelector notes={this.props.notes}
           onNewNoteClicked={this.onNewNoteClicked} 
           onDeleteNoteClicked={this.onDeleteNoteClicked}/>
        </div>
        <div className="col-9 ml-2">
          {editorDisplay}
        </div>
      </div>
      );
    }
  }
}

NotePage.propTypes = {
  notes: PropTypes.array.isRequired,
  activeNote: PropTypes.object,
  auth: PropTypes.object,
  actions:  PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired
};

const mapStateToProps = (state) => (
  {
   notesTest: state.firebase.data.notes, 
   notes: state.editor.notes,
   activeNote: state.editor.activeNote
  });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(editorActions,dispatch)
});

export default compose (
  connect( ({firebase}) => ({auth: firebase.auth})),
  firebaseConnect(({auth}) => [
    { path: `notes/${auth.uid}`}
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(NotePage);