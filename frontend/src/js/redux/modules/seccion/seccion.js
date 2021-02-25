import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "seccion",
    "secciones",
    "seccionForm",
    "/seccion",
);

export default handleActions(reducers, initialState);