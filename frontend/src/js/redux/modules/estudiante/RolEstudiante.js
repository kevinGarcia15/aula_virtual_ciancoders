import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const DASHBOARD_MIS_CURSOS = "DASHBOARD_MIS_CURSOS";
const DASHBOARD_TAREAS_ENTREGAR = "DASHBOARD_TAREAS_ENTREGAR";

const misCursos = ()=>(dispach) => {
    api.get("/estudiante/cursos_estudiante")
        .then((response) => {
            dispach({ type: DASHBOARD_MIS_CURSOS, cursosAsignados: response });
        })
        .catch((error) => {
            NotificationManager.error(
                error,
                "ERROR",
                3000
            );
        });
};

const tareasPendientes = ()=>(dispach) => {
    api.get("/estudiante/tareas_entregar")
        .then((response) => {
            dispach({ type: DASHBOARD_TAREAS_ENTREGAR, tareasEntregar: response });
        })
        .catch((error) => {
            NotificationManager.error(
                error,
                "ERROR",
                3000
            );
        });
};


export const actions = {
    misCursos,
    tareasPendientes
};

export const reducers = {
    [DASHBOARD_MIS_CURSOS]: (state, { cursosAsignados }) => {
        return {
            ...state,
            cursosAsignados,
        };
    },
    [DASHBOARD_TAREAS_ENTREGAR]: (state, { tareasEntregar }) => {
        return {
            ...state,
            tareasEntregar,
        };
    },
};

export const intialState = {
    loader: false,
    cursosAsignados:{},
    tareasEntregar:{},
};

export default handleActions(reducers, intialState);