import {EditorState, convertToRaw} from 'draft-js';

let notes = [
];

class NoteApi {
  static getAllNotes() {
    return new Promise((resolve) => {
     resolve(Object.assign([], notes));
    });
  }

  static guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  static createNewNote() {
    let id = this.guid();
    return new Promise((resolve) => {
      let newNote = {
        id: id,
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
      notes.unshift(note);
      resolve(note); 
    });
  }
}


export default NoteApi;