import initialState from '../store/initialState';
import * as types from '../actions/actionTypes';

export default function editorReducer(state = initialState.editor, action) {
  switch(action.type) {
    case 'NOTE_SELECTED':
      return Object.assign({}, state, {activeNote: state.notes.filter(note => note.id === action.noteId)[0]});
    case types.LOAD_NOTES_SUCCESS:
      return Object.assign({}, state, {notes: action.notes});
    case types.CREATE_NOTE_SUCCESS:
      return Object.assign({}, state, {notes: [...state.notes,action.note]});
    case types.SAVE_NOTE_SUCCESS:
      return Object.assign({}, state, {activeNote: action.note, notes: [...state.notes.filter(note => note.id != action.note.id), action.note]});
    case types.DELETE_NOTE_SUCCESS:
      if (action.notes.filter(note => state.activeNote === note).length === 0) {
        return Object.assign({}, state, {notes: [...action.notes], activeNote: null});
      } else {
        return Object.assign({}, state, {notes: [...action.notes]});
      }
    default:
      return state; 
  }
}
