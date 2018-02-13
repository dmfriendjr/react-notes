import {EditorState, ContentState} from 'draft-js';

let notes = [
  {
    id: 0,
    name: 'Note1',
    editorState: EditorState.createWithContent(ContentState.createFromText('string here'))
  },
  {
    id: 1,
    name: 'Note2',
    editorState: EditorState.createWithContent(ContentState.createFromText('string2 here'))  },
  {
    id: 2,
    name: 'Note3',
    editorState: EditorState.createEmpty()
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
        editorState: EditorState.createEmpty()
      };
      notes.push(newNote);
      resolve(newNote);
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