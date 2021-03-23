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
const GUARDAR_LISTADO_GRADOS = "GUARDAR_LISTADO_GRADOS"
const baseReducer = createReducer(
    "grado",
    "grados",
    "gradoForm",
    "/grado",
);

export const listarGrados = (page=1) => (dispach) => {
    const params = {page}
    api.get("/grados", params)
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_GRADOS, dataGrado: response });
            dispach({type:GUARDAR_PAGINA, pagina:page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro de grados",
                "ERROR",
                3000
            );
        });
};

const leerGrado = id => (dispatch) => {
    api.get(`grados/${id}`).then((response) => {
        response.nivel = {value:response.nivel.id, label:response.nivel.nombre}
        dispatch(initializeForm("gradoForm", response));
    }).catch(() => {
    }).finally(() => {

    });
};

const editarGrado = (id, data) => (dispatch) => {
    const formData={
        nivel : data.nivel.value,
        nombre :  data.nombre,
        descripcion : data.descripcion
    }
    api.put(`grados/${id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push("/grado"));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {

    });
};

const crearGrado = (data) => (dispatch) => {
    const formData={
        nivel : data.nivel.value,
        nombre :  data.nombre,
        descripcion : data.descripcion
    }
    api.post("/grados", formData)
        .then((response) => {
            NotificationManager.success(
                "Registro crado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/grado"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar un grado",
                "ERROR",
                3000
            );
        });
};
export const actions = {
    ...baseReducer.actions,
    crearGrado,
    leerGrado,
    editarGrado,
    listarGrados
}
export const reducers = {
    ...baseReducer.reducers,
    [GUARDAR_PAGINA]:(state, {pagina})=>{
        return{
            ...state,
            pagina
        }
    },
    [GUARDAR_LISTADO_GRADOS]:(state, {dataGrado})=>{
        return{
            ...state,
            dataGrado
        }
    }
}

export const initialState = {
    ...baseReducer.initialState,
    dataGrado:{},
    pagina:1
}
export default handleActions(reducers, initialState);