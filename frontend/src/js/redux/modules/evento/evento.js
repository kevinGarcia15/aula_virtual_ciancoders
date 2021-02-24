import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "evento",
    "evento",
    "eventoForm",
    "/admin",
);

export default handleActions(reducers, initialState);