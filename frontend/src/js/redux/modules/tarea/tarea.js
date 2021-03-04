import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_LISTADO_TAREAS = "GUARDAR_LISTADO_TAREAS";

const listarTareas = (id) => (dispatch) => {
    api.get("tareas/asignacion", {id})
        .then((response) => {
            const data = {
                results: response.tareas,
            };
            dispatch({
                type: GUARDAR_LISTADO_TAREAS,
                data: data,
            });
        })
        .catch(() => {})
        .finally(() => {});
};
export const actions = {
    listarTareas,

};

export const reducers = {
    [GUARDAR_LISTADO_TAREAS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

export const intialState = {
    loader: false,
    data: {},
};

export default handleActions(reducers, intialState);