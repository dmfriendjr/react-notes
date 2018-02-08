import {EditorState} from 'draft-js';

const defaultState = {
  editorState: EditorState.createEmpty(),
};

const editorReducer = (state = defaultState, { payload, type }) => {
  switch(type) {
    case 'UPDATE_EDITOR_STATE':
    return {
      ...state,
      editorState: payload
    };
    case 'SAVE_NOTE':
    break;
    default:
      return state; 
  }
};


export default editorReducer;