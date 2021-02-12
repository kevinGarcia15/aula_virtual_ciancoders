import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_ESTUDIANTE = "GUARDAR_LISTADO_ESTUDIANTE";
const GUARDAR_REGISTRO_ESTUDIANTE = "GUARDAR_REGISTRO_ESTUDIANTE"

export const listar = () => (dispach) => {
    api.get("/estudiante")
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_ESTUDIANTE, data: response });
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
                "address":data.address                }
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
    registroEstudiante,
    eliminar
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
};

export const intialState = {
    loader: false,
    data: {},
};

export default handleActions(reducers, intialState);
