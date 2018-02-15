import React from 'react';
import PropTypes from 'prop-types';
import {Editor, RichUtils} from 'draft-js';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faBold from '@fortawesome/fontawesome-pro-regular/faBold';

const editorStyle = {
  height: '100%'
};

class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {editorState: this.props.editorState};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({editorState: nextProps.editorState});
  }

  _onFocusClick() {
    this.noteEditor.focus();
  }

  _onBoldClick() {
    this.props.onNoteChanged(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
      <div className="h-100">
        <div className="row">
          <div className="col">
            <input type="text" value={this.props.noteTitle} onChange={(event) => this.props.onNoteTitleChanged(event.target.value)} />
            <button onClick={this._onBoldClick.bind(this)}>Bold</button>
            <button onClick={this.props.onNoteSaved}>Save</button>
          </div>
        </div>
        <div style={editorStyle} onClick={this._onFocusClick.bind(this)} className="row border rounded">
          <div className="col">
            <Editor editorState={this.props.editorState} onChange={this.props.onNoteChanged} ref={(editor) => this.noteEditor = editor} />
          </div>
        </div>
      </div>
    );
  }
}

NoteEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  noteId: PropTypes.string.isRequired,
  noteTitle: PropTypes.string.isRequired,
  onNoteTitleChanged: PropTypes.func.isRequired,
  onNoteChanged: PropTypes.func.isRequired,
  onNoteSaved: PropTypes.func.isRequired
};

export default NoteEditor;