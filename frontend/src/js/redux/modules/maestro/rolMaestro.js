import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const DASHBOARD_CURSOS_ASIGNADOS = "DASHBOARD_CURSOS_ASIGNADOS";
const DASHBOARD_TAREAS = "DASHBOARD_TAREAS";
const GUARDAR_PAGINA = "GUARDAR_PAGINA"

const cursosAsignados = (page=1)=>(dispach) => {
    const params = {page}
    api.get("/maestro/cursos_maestro", params)
        .then((response) => {
            const data = {
                results: response.maestro,
            };
            dispach({ type: DASHBOARD_CURSOS_ASIGNADOS, cursosMaestro: response });
            dispach({type:GUARDAR_PAGINA, pagina:page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

const tareas = ()=>(dispach) => {
    api.get("/maestro/total_tareas")
        .then((response) => {
            dispach({ type: DASHBOARD_TAREAS, tareasPendientes: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};


export const actions = {
    cursosAsignados,
    tareas,
};

export const reducers = {
    [DASHBOARD_CURSOS_ASIGNADOS]: (state, { cursosMaestro }) => {
        return {
            ...state,
            cursosMaestro,
        };
    },
    [DASHBOARD_TAREAS]: (state, { tareasPendientes }) => {
        return {
            ...state,
            tareasPendientes,
        };
    },
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina
        }   
    },
};

export const intialState = {
    loader: false,
    cursosMaestro:{},
    tareasPendientes:{},
};

export default handleActions(reducers, intialState);
