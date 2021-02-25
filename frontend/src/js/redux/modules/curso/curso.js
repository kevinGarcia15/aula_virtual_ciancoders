import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "curso",
    "cursos",
    "cursoForm",
    "/curso",
);

export default handleActions(reducers, initialState);