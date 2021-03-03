import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_REGISTRO_ASIGNACION = "GUARDAR_REGISTRO_ASIGNACION"

const leer = id => (dispatch) => {
    api.get(`asignaciones/${id}`).then((response) => {
        dispatch({type:GUARDAR_REGISTRO_ASIGNACION, infoAsignacion:response})
    }).catch(() => {
    }).finally(() => {
    });
};

export const actions = {
    leer,
};

export const reducers = {
    [GUARDAR_REGISTRO_ASIGNACION]: (state, { infoAsignacion }) => {
        return {
            ...state,
            infoAsignacion,
        };
    },
};

export const intialState = {
    loader: false,
    infoAsignacion: {}
};

export default handleActions(reducers, intialState);