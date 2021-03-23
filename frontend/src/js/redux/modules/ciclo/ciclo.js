import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import {api} from "api"
import {NotificationManager} from "react-notifications"
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_PAGINA="GUARDAR_PAGINA"
const GUARDAR_LISTADO_CICLOS = "GUARDAR_LISTADO_CICLOS"
const baseReducer  = createReducer(
    "ciclo",
    "ciclos",
    "cicloForm",
    "/ciclos",
);

export const listarCiclo = (page=1) => (dispach) => {
    const params = {page}
    api.get("/ciclos", params)
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_CICLOS, dataCiclo: response });
            dispach({type:GUARDAR_PAGINA, pagina:page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro de ciclos",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    ...baseReducer.actions,
    listarCiclo
}
export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina
        }
    },
    [GUARDAR_LISTADO_CICLOS]:(state, {dataCiclo})=>{
        return{
            ...state,
            dataCiclo
        }
    }
}

export const initialState = {
    ...baseReducer.initialState,
    dataCiclo:{},
    pagina:1
}
export default handleActions(reducers, initialState);