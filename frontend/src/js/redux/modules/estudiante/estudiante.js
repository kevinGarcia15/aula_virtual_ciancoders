import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_ESTUDIANTE = "GUARDAR_LISTADO_ESTUDIANTE";
const GUARDAR_REGISTRO_ESTUDIANTE = "GUARDAR_REGISTRO_ESTUDIANTE"
const GUARDAR_PAGINA = "GUARDAR_PAGINA"

export const listar = (page=1) => (dispach, getStore) => {
    const estado = getStore().estudiante
    const params = {page}
    api.get("/estudiante", params)
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_ESTUDIANTE, data: response });
            dispach({type:GUARDAR_PAGINA, page: page})
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro estudiante",
                "ERROR",
                3000
            );
        });
};

export const registroEstudiante = () => (dispatch, getStore) => {
    const data = getStore().form.maestroForm.values;

    const formData={
        "telefono_contacto": data.telefono_contacto,
        "direccion_contacto": data.direccion_contacto,
        "user":{
            "username":data.username,
            "password": data.password,
            "email":data.email,
            "first_name": data.first_name,
            "last_name":data.last_name,
            "profile":{
                "phone": data.phone,
                "address":data.address                
            }
        }
    }
    api.post("/estudiante", formData)
        .then((response) => {
            NotificationManager.success(
                "Registro crado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/estudiantes"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar al maestro",
                "ERROR",
                3000
            );
        });
};


export const actualizarEstudiante = () => (dispatch, getStore) => {
    const data = getStore().form.maestroForm.values;
    const id = data.id
    const formData={
        "telefono_contacto": data.telefono_contacto,
        "direccion_contacto": data.direccion_contacto,
        "user":{
            "first_name": data.first_name,
            "last_name":data.last_name,
            "profile":{
                "phone": data.phone,
                "address":data.address                
            }
        }
    }
    api.put(`/estudiante/${id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Registro actualizado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/estudiantes"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al actualizar al estudiante",
                "ERROR",
                3000
            );
        });
};

export const leer = (id) => (dispatch) => {
    api.get(`/estudiante/${id}`)
        .then((response) => {
            dispatch({type:GUARDAR_REGISTRO_ESTUDIANTE, registro:response})
            const datosForm={
                "id":response.id,
                "address":response.estudiante_profile.address,
                "phone":response.estudiante_profile.phone,
                "rol":response.estudiante_profile.rol,
                "email":response.estudiante_profile.user.email,
                "first_name":response.estudiante_profile.user.first_name,
                "last_name":response.estudiante_profile.user.last_name,
                "username":response.estudiante_profile.user.username,
                "direccion_contacto":response.direccion_contacto,
                "telefono_contacto":response.telefono_contacto
            }
            dispatch(initializeForm("maestroForm", datosForm));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

export const eliminar = (id)=>(dispatch)=>{
    api.eliminar(`/estudiante/${id}`)
    .then((response) => {
        NotificationManager.success(
            "Estudiante eliminado exitosamente",
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
    leer,
    registroEstudiante,
    eliminar,
    actualizarEstudiante
};

export const reducers = {
    [GUARDAR_LISTADO_ESTUDIANTE]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISTRO_ESTUDIANTE]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    [GUARDAR_PAGINA]:(state, {page})=>{
       return{
        ...state,
        page     
    } 
    }
};

export const intialState = {
    loader: false,
    data: {},
    page: 1
};

export default handleActions(reducers, intialState);
