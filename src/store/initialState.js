import {EditorState} from 'draft-js';

const initialState = {
  editorState: EditorState.createEmpty(),
  notes: []
};

console.log(initialState);

export default initialState;