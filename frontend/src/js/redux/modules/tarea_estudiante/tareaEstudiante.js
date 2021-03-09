import { handleActions } from "redux-actions";
import { initialize as initilizeForm } from "redux-form";
import {api} from "api";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";

const GUARDAR_LISTADO_TAREA_ESTUDIANTES = "GUARDAR_LISTADO_TAREA_ESTUDIANTES";
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
        })
        .catch(() => {})
        .finally(() => {});
};
export const actions = {
    listar,
}
export const reducers = {
    [GUARDAR_LISTADO_TAREA_ESTUDIANTES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};
export const initialState = {
    loader: false,
    data: {},
};

export default handleActions(reducers, initialState);
