import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function editorReducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_EDITOR_STATE':
    break;
    case types.LOAD_NOTES_SUCCESS:
      return Object.assign({}, state, {notes: action.notes});
    case types.CREATE_NOTE_SUCCESS:
      return Object.assign({}, state, {notes: [...state.notes,action.note]});
    case types.SAVE_NOTE_SUCCESS:
      return Object.assign({}, state, {notes: [...state.notes.filter(note => note.id != action.note.id), action.note]});
    default:
      return state; 
  }
};
