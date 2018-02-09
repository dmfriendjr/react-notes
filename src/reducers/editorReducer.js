import {EditorState} from 'draft-js';
import initialState from '../store/initialState';


const editorReducer = (state = initialState.notesState, { payload, type }) => {
  switch(type) {
    case 'UPDATE_EDITOR_STATE':
    case 'SAVE_NOTES_STATE':
    return Object.assign({}, state, {notesState: updateObjectInArray(state.notesState, payload)});
    default:
      return state; 
  }
};

function updateObjectInArray(array, action) {
  return array.map( (item) => {
      console.log(item.id !== action.id);
      if(item.id !== action.id) {
          // This isn't the item we care about - keep it as-is
          return item;
      }

      // Otherwise, this is the one we want - return an updated value
      return action;    
  });
}

export default editorReducer;