import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";


// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "grado",
    "grados",
    "gradoForm",
    "/grado",
);

export default handleActions(reducers, initialState);