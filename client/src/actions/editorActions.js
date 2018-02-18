import * as types from './actionTypes';
import noteApi from '../api/mockApi';
import {EditorState, convertToRaw} from 'draft-js';

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

export function loadNotes(firebase, uid) {
  return dispatch => {
    return firebase.ref().child(`notes/${uid}`).once('value').then((snapshot) => {
      console.log(JSON.parse(Object.values(snapshot.val())[0].content));
      let notes = Object.values(snapshot.val());
      console.log('Pre:', notes);
      for(let i = 0; i < notes.length; i++) {
        notes[i].content = JSON.parse(notes[i].content);
      }
      console.log('Post:', notes);
      dispatch(loadNotesSuccess(notes));
    // return noteApi.getAllNotes().then(notes => {
    //   dispatch(loadNotesSuccess(notes));
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
    let key = firebase.ref().child(`notes`).push().key;
    let newNote = { 
      id: key,
      name: 'New Note',
      //Have to create a raw blank state here and stringify for storage in firebase
      content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()))
    };
    return firebase.set(`notes/${uid}/${key}`, newNote).then( () => {
      newNote.content = JSON.parse(newNote.content);
      dispatch(createNoteSuccess(newNote));
    });
  };
}