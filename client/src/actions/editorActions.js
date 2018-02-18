import * as types from './actionTypes';
import {EditorState, convertToRaw} from 'draft-js';

export function saveNoteSuccess(note) {
  return {type: types.SAVE_NOTE_SUCCESS, note};
}

export function deleteNoteSuccess(noteId) {
  return {type: types.DELETE_NOTE_SUCCESS, noteId};
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

export function clearNotesStore() {
  return {type: types.CLEAR_NOTES_STORE};
}

export function loadNotes(firebase, uid) {
  return dispatch => {
    return firebase.ref().child(`notes/${uid}`).once('value').then((snapshot) => {
      let notes = [];
      if (snapshot.val()) {
        notes = Object.values(snapshot.val());
        for(let i = 0; i < notes.length; i++) {
          notes[i].content = JSON.parse(notes[i].content);
        }
      }
      dispatch(loadNotesSuccess(notes));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteNote(noteId, firebase, uid) {
  return dispatch => {
    return firebase.ref().child(`notes/${uid}/${noteId}`).remove().then(() => {
      dispatch(deleteNoteSuccess(noteId));
    });
  };
}

export function saveNote(note, firebase, uid) {
  return dispatch => {
    let noteToSave = Object.assign({}, note);
    noteToSave.content = JSON.stringify(noteToSave.content);
    return firebase.set(`notes/${uid}/${note.id}`, noteToSave).then(() => {
        dispatch(saveNoteSuccess(note));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createNewNote(firebase, uid) {
  return dispatch => {
    let key = firebase.ref().child(`notes/${uid}`).push().key;
    let newNote = { 
      id: key,
      name: 'New Note',
      content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
    };
    return firebase.set(`notes/${uid}/${key}`, newNote).then( () => {
      newNote.content = JSON.parse(newNote.content);
      dispatch(createNoteSuccess(newNote));
    });
  };
}