import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

/* rootreducer combines all subreducers */
const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer
});

export default rootReducer;
