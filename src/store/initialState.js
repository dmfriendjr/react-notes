import {EditorState, ContentState} from 'draft-js';

const initialState = {
  editorState: EditorState.createEmpty(),
  notesState: [
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
  ]
};

export default initialState;