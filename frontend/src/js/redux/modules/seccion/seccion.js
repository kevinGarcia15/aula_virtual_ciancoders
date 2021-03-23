import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import {api} from "api"
import {NotificationManager} from "react-notifications"

// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_PAGINA="GUARDAR_PAGINA"
const GUARDAR_LISTADO_SECCIONES = "GUARDAR_LISTADO_SECCIONES"


const baseReducer  = createReducer(
    "seccion",
    "secciones",
    "seccionForm",
    "/seccion",
);

export const listarSecciones = (page=1) => (dispach) => {
    const params = {page}
    api.get("/secciones", params)
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_SECCIONES, dataSecciones: response });
            dispach({type:GUARDAR_PAGINA, pagina:page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro de secciones",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    ...baseReducer.actions,
    listarSecciones
}
export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina
        }
    },
    [GUARDAR_LISTADO_SECCIONES]:(state, {dataSecciones})=>{
        return{
            ...state,
            dataSecciones
        }
    }
}

export const initialState = {
    ...baseReducer.initialState,
    dataSecciones:{},
    pagina:1
}


export default handleActions(reducers, initialState);