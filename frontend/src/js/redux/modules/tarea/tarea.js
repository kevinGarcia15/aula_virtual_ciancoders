import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const LOADER = "ASIGNACION_LOADER";
const GUARDAR_LISTADO_TAREAS = "GUARDAR_LISTADO_TAREAS";
const GUARDAR_TAREA = "GUARDAR_TAREA"

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
            dispatch({
                type: GUARDAR_TAREA,
                leerTarea: {},
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

const leer = (id) => (dispatch) => {
    api.get(`tareas/${id}`)
        .then((response) => {
            dispatch(initializeForm("tareaForm", response));
            dispatch({
                type: GUARDAR_TAREA,
                leerTarea: response,
            });
        })
        .catch((error) => {
            NotificationManager.error(
                error.detail,
                "ERROR",
                0
            );
        })
        .finally(() => {});
};

export const actions = {
    listarTareas,
    crear,
    leer,
};

export const reducers = {
    [GUARDAR_LISTADO_TAREAS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_TAREA]: (state, { leerTarea }) => {
        return {
            ...state,
            leerTarea,
        };
    },

};

export const intialState = {
    loader: false,
    data: {},
    leerTarea:{}
};

export default handleActions(reducers, intialState);