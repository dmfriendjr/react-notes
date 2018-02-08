// Set up your root reducer here...
 import { combineReducers } from 'redux';
import notes from './noteReducer';


const rootReducer = combineReducers({notes});

 export default rootReducer;