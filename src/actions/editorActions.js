import * as types from './actionTypes';
import noteApi from '../api/mockApi'; 

export function saveNoteSuccess(note) {
  return {type: types.SAVE_NOTE_SUCCESS, note};
}

export function deleteNoteSuccess(notes) {
  return {type: types.DELETE_NOTE_SUCCESS, notes};
}

export function loadNotesSuccess(notes) {
  return {type: types.LOAD_NOTES_SUCCESS, notes};
}

export function createNoteSuccess(note) {
  return {type: types.CREATE_NOTE_SUCCESS, note};
}

export function noteSelected(noteId) {
  return {type: types.NOTE_SELECTED, noteId};
}

export function loadNotes() {
  return dispatch => {
    return noteApi.getAllNotes().then(notes => {
      dispatch(loadNotesSuccess(notes));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteNote(noteId) {
  return dispatch => {
    return noteApi.deleteNote(noteId).then((notes) => {
      dispatch(deleteNoteSuccess(notes));
    });
  };
}

export function saveNote(note) {
  return dispatch => {
    return noteApi.saveNote(note).then( (note) => {
      dispatch(saveNoteSuccess(note));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createNewNote() {
  console.log('Creating new note callback started');
  return dispatch => {
    return noteApi.createNewNote().then( (note) => {
      dispatch(createNoteSuccess(note));
    });
  };
}