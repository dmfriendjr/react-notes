// Set up your root reducer here...
import editorReducer from './editorReducer';
import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';


const rootReducer = combineReducers({editor: editorReducer, firebase: firebaseReducer}); 

export default rootReducer;