import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBold from '@fortAwesome/fontawesome-pro-regular/faBold';

const editorStyle = {
  height: '100%'
};

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onFocusClick() {
    this.noteEditor.focus();
  }

  _onBoldClick() {
    console.log(this.state.editorState);
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (
      <div className="h-75">
        <div className="row m-3">
          <div className="col">
            <button onClick={this._onBoldClick.bind(this)}><FontAwesomeIcon icon={faBold}/></button>
          </div>
        </div>
        <div style={editorStyle} onClick={this._onFocusClick.bind(this)} className="row m-3 border rounded">
          <div className="col">
            <Editor editorState={this.state.editorState} onChange={this.onChange}
            ref={(editor) => this.noteEditor = editor} />
          </div>
        </div>
      </div>
    );
  }
}

export default Note;