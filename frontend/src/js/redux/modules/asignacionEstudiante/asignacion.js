import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_LISTADO_ESTUDIANTE_ASIGNADOS =
    "GUARDAR_LISTADO_ESTUDIANTE_ASIGNADOS";
const INFORMACION_CURSO = "INFORMACION_CURSO"

const listarEstudiantes = (id) => (dispatch) => {
    api.get("asignaciones/estudiantes", { id })
        .then((response) => {
            const data = {
                results: response.estudiantes
           }
            dispatch({
                type: GUARDAR_LISTADO_ESTUDIANTE_ASIGNADOS,
                data: data,
            });
            dispatch({
                type: INFORMACION_CURSO,
                curso: response.infoCurso,
            });
        })
        .catch(() => {})
        .finally(() => {});
};

const asignar = (id) => (dispatch) => {
    api.post("asignaciones/estudiantes")
        .then((response) => {
           
        })
        .catch(() => {})
        .finally(() => {});
};

export const actions = {
    listarEstudiantes,
    asignar,
};

export const reducers = {
    [GUARDAR_LISTADO_ESTUDIANTE_ASIGNADOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [INFORMACION_CURSO]: (state, { curso }) => {
        return {
            ...state,
            curso,
        };
    },
};

export const intialState = {
    loader: false,
    data: {},
    curso:{},
};

export default handleActions(reducers, intialState);
