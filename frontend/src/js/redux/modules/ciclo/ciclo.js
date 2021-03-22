import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "ciclo",
    "ciclos",
    "cicloForm",
    "/ciclos",
);

export default handleActions(reducers, initialState);