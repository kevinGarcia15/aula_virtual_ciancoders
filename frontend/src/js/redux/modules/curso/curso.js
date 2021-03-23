import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import {api} from "api"
import {NotificationManager} from "react-notifications"

// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_PAGINA="GUARDAR_PAGINA"
const GUARDAR_LISTADO_CURSOS = "GUARDAR_LISTADO_CURSOS"

const baseReducer= createReducer(
    "curso",
    "cursos",
    "cursoForm",
    "/curso",
);

export const listarCursos = (page=1) => (dispach) => {
    const params = {page}
    api.get("/cursos", params)
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_CURSOS, dataCurso: response });
            dispach({type:GUARDAR_PAGINA, pagina:page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro de cursos",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    ...baseReducer.actions,
    listarCursos
}
export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina
        }
    },
    [GUARDAR_LISTADO_CURSOS]:(state, {dataCurso})=>{
        return{
            ...state,
            dataCurso
        }
    }
}

export const initialState = {
    ...baseReducer.initialState,
    dataCurso:{},
    pagina:1
}
export default handleActions(reducers, initialState);