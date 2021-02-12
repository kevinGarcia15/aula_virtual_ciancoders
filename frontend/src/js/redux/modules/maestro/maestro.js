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
    const data = getStore().form.maestroForm.values;
    const formData={
        "profesion": data.profesion,
        "user":{
            "username":data.username,
            "password": data.password,
            "email":data.email,
            "first_name": data.first_name,
            "last_name":data.last_name,
            "profile":{
                "phone": data.phone,
                "address":data.address                }
        }
    }
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
            const datosForm={
                "id":response.id,
                "address":response.maestro_profile.address,
                "phone":response.maestro_profile.address,
                "rol":response.maestro_profile.rol,
                "email":response.maestro_profile.user.email,
                "first_name":response.maestro_profile.user.first_name,
                "last_name":response.maestro_profile.user.last_name,
                "username":response.maestro_profile.user.username,
            }
            dispatch(initializeForm("maestroForm", datosForm));
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
