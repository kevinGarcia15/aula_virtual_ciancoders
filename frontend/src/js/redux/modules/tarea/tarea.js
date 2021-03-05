import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const LOADER = "ASIGNACION_LOADER";
const GUARDAR_LISTADO_TAREAS = "GUARDAR_LISTADO_TAREAS";

export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});

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

export const crear = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.postAttachments("tareas", data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Tarea creada exitosamente",
                "ERROR",
                2000
            );
            dispatch(push(`/asignacion/${data.asignacion}/estudiantes`));
        })
        .catch((error) => {
            NotificationManager.error(
                error.detail,
                "ERROR",
                0
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};
export const actions = {
    listarTareas,
    crear,

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