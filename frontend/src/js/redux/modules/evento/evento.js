import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "evento",
    "evento",
    "eventoForm",
    "grids",
);

export default handleActions(reducers, initialState);