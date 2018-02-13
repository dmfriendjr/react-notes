import {EditorState, ContentState, convertToRaw} from 'draft-js';

let notes = [
];

class NoteApi {
  static getAllNotes() {
    return new Promise((resolve) => {
     resolve(Object.assign([], notes));
    });
  }

  static createNewNote() {
    return new Promise((resolve) => {
      let newNote = {
        id: notes.length,
        name: 'New Note',
        content: convertToRaw(EditorState.createEmpty().getCurrentContent())
      };
      notes.push(newNote);
      resolve(newNote);
    });
  }

  static deleteNote(noteId) {
    return new Promise((resolve) => {
      notes = notes.filter(note => note.id != noteId);
      resolve(notes);
    });
  }

  static saveNote(note) {
    return new Promise((resolve) => {
      note = Object.assign({}, note); //to avoid manipulating data passed in
      notes = notes.filter(n => n.id != note.id);
      notes.push(note);
      resolve(note); 
    });
  }
}


export default NoteApi;