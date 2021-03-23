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
const GUARDAR_PAGINA = "GUARDAR_PAGINA";

/**Modulo utilizado para listar a los estudiantes pertenecientes
 * a una asignacion mostrado en la gestion de asignacion de maestros
 */
const listarEstudiantes = (id, page=1) => (dispatch) => {

    api.get("asignaciones/estudiantes", { id, page })
        .then((response) => {
            dispatch({
                type: GUARDAR_LISTADO_ESTUDIANTES_ASIGNADOS,
                data: response,
            });
            dispatch({type:GUARDAR_PAGINA, pagina:page})
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

export const eliminar = (id, id_asignacion)=>(dispatch)=>{
    const formData = {
        "id_estudiante": id,
        "id_asignacion": parseInt(id_asignacion)
    }
    api.post('/asignaciones/elimiar_alumno',formData)
    .then((response) => {
        NotificationManager.success(
            "Alumno eliminado exitosamente",
            "Exito",
            3000
        );
        dispatch(listarEstudiantes(id_asignacion));
    })
    .catch((error) => {
        NotificationManager.error(
            "Ocurrio un error al eliminar el registro",
            "ERROR",
            3000
        );
    });
}
export const actions = {
    listarEstudiantes,
    obtenerEstudiantes,
    asignar,
    eliminar,
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
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina,
        }
    }
};

export const intialState = {
    loader: false,
    data: {},
    curso: {},
    pagina:1,
};

export default handleActions(reducers, intialState);
