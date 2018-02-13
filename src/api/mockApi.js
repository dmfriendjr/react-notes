import {EditorState, ContentState, convertToRaw} from 'draft-js';

let notes = [
  {
    id: 0,
    name: 'Note1',
    content: convertToRaw(EditorState.createWithContent(ContentState.createFromText('string here')).getCurrentContent())
  },
  {
    id: 1,
    name: 'Note2',
    content: convertToRaw(EditorState.createWithContent(ContentState.createFromText('string2 here')).getCurrentContent()) 
  },
  {
    id: 2,
    name: 'Note3',
    content: convertToRaw(EditorState.createWithContent(ContentState.createFromText('string3 here')).getCurrentContent())
  }
];

class NoteApi {
  static getAllNotes() {
    return new Promise((resolve, reject) => {
     resolve(Object.assign([], notes));
    });
  }

  static createNewNote() {
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      notes = notes.filter(note => note.id != noteId);
      resolve(notes);
    });
  }

  static saveNote(note) {
    return new Promise((resolve, reject) => {
      note = Object.assign({}, note); //to avoid manipulating data passed in
      notes = notes.filter(n => n.id != note.id);
      notes.push(note);
      resolve(note); 
    });
  }
}


export default NoteApi;