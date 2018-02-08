import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Editor, EditorState, RichUtils} from 'draft-js';
import NoteSelector from './NoteSelector';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBold from '@fortawesome/fontawesome-pro-regular/faBold';

const editorStyle = {
  height: '100%'
};

const fakeNoteData = [
  {
    name: 'Note1'
  },
  {
    name: 'Note2'
  },
  {
    name: 'Note3'
  }
];

class Note extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: this.props.editorState};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onFocusClick() {
    this.noteEditor.focus();
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onSaveClick() {
    this.props.onSaveEditorState(this.state.editorState);
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
          <NoteSelector notes={fakeNoteData} />
          <div className="col">
            <Editor editorState={this.state.editorState} onChange={this.onChange}
            ref={(editor) => this.noteEditor = editor} />
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  editorState: PropTypes.object.isRequired,
  onSaveEditorState: PropTypes.func.isRequired
};

const mapStateToProps = ({editorState}) => ({editorState});

const mapDispatchToProps = (dispatch) => ({
onSaveEditorState: (editorState) => {
  dispatch({
    type: 'UPDATE_EDITOR_STATE',
    payload: editorState
  });
}
});

const ConnectedNote = connect(mapStateToProps, mapDispatchToProps)(Note);

export default ConnectedNote;