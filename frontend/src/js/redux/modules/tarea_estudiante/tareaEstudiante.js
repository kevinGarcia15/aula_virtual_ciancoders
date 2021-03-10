import { handleActions } from "redux-actions";
import { initialize as initilizeForm } from "redux-form";
import {api} from "api";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";

const GUARDAR_LISTADO_TAREA_ESTUDIANTES = "GUARDAR_LISTADO_TAREA_ESTUDIANTES";
const GUARDAR_INFO_TAREA = "GUARDAR_INFO_TAREA";

const listar = (id) => (dispatch) => {
    api.get("tareaestudiantes/entregados", { id })
        .then((response) => {
            const data = {
                results: response.entregas,
            };
            dispatch({
                type: GUARDAR_LISTADO_TAREA_ESTUDIANTES,
                data: data,
            });
            dispatch({
                type: GUARDAR_INFO_TAREA,
                infoTarea: response.tarea,
            });
        })
        .catch(() => {})
        .finally(() => {});
};

export const actualizarPunteo = (data = {}) => (dispatch, getStore) => {
    api.put(`tareaestudiantes/${data.id_tarea_estudiante}`, data)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "Exito",
                1000
            );
            dispatch( listar(data.id_tarea));
        })
        .catch((error) => {
            NotificationManager.error(
                error.detail,
                "ERROR",
                0
            );
        })
        .finally(() => {
        });
};
export const actions = {
    listar,
    actualizarPunteo,
}
export const reducers = {
    [GUARDAR_LISTADO_TAREA_ESTUDIANTES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_INFO_TAREA]: (state, { infoTarea }) => {
        return {
            ...state,
            infoTarea,
        };
    },
};
export const initialState = {
    loader: false,
    data: {},
    infoTarea:{}
};

export default handleActions(reducers, initialState);
