import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_MAESTRO = "GUARDAR_LISTADO_MAESTRO";
const GUARDAR_REGISTRO_MAESTRO = "GUARDAR_REGISTRO_MAESTRO";

export const listar = () => (dispach) => {
    api.get("/maestro")
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_MAESTRO, data: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro maestros",
                "ERROR",
                3000
            );
        });
};

export const registroMaestro = () => (dispatch, getStore) => {
    console.log('entro aqui')
    const formData = getStore().form.maestroForm.values;
    api.post("/maestro", formData)
        .then((response) => {
            NotificationManager.success(
                "Registro crado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/maestros"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar al maestro",
                "ERROR",
                3000
            );
        });
};

export const leer = (id) => (dispatch) => {
    api.get(`/maestro/${id}`)
        .then((response) => {
            dispatch({type:GUARDAR_REGISTRO_MAESTRO, registro:response})
            dispatch(initializeForm("maestroForm", response));
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

export const eliminar = (id)=>(dispatch)=>{
    api.eliminar(`/maestro/${id}`)
    .then((response) => {
        NotificationManager.success(
            "Maestro eliminado exitosamente",
            "Exito",
            3000
        );
        dispatch(listar());
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
    listar,
    registroMaestro,
    leer,
    eliminar
};

export const reducers = {
    [GUARDAR_LISTADO_MAESTRO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_MAESTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
};

export const intialState = {
    loader: false,
    data: {},
    registro:{},
};

export default handleActions(reducers, intialState);
