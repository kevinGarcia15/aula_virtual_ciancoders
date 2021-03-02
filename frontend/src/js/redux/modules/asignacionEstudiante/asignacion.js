import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_LISTADO_ESTUDIANTES_ASIGNADOS =
    "GUARDAR_LISTADO_ESTUDIANTES_ASIGNADOS";
const INFORMACION_CURSO = "INFORMACION_CURSO";

const listarEstudiantes = (id) => (dispatch) => {
    api.get("asignaciones/estudiantes", { id })
        .then((response) => {
            const data = {
                results: response.estudiantes,
            };
            console.log(data)
            dispatch({
                type: GUARDAR_LISTADO_ESTUDIANTES_ASIGNADOS,
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

const obtenerEstudiantes = (search) => () => {
    return api
        .get("/estudiante", { search })
        .then((data) => {
            if (data) {
                const estudiantes = [];
                data.results.forEach((estudiante) => {
                    estudiantes.push({
                        value: estudiante.id,
                        label: `${estudiante.estudiante_profile.user.first_name} ${estudiante.estudiante_profile.user.last_name}`,
                    });
                });
                return estudiantes;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro maestros",
                "ERROR",
                3000
            );
        });
};
const asignar = (id, data) => (dispatch) => {
    const formData = {
        asignatura: parseInt(id),
        estudiante: data.estudiante.value,
    };
    api.post("asignaciones/estudiante_asignar", formData)
        .then((response) => {
            NotificationManager.success(
                "Estudiante agreagdo exitosamente",
                "Exito",
                3000
            );
            dispatch(listarEstudiantes(id));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 3000);
        })
        .finally(() => {
        });
};

export const actions = {
    listarEstudiantes,
    obtenerEstudiantes,
    asignar,
};

export const reducers = {
    [GUARDAR_LISTADO_ESTUDIANTES_ASIGNADOS]: (state, { data }) => {
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
    curso: {},
};

export default handleActions(reducers, intialState);
