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
    const formData = getStore().form.maestroForm.values;
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

export const actions = {
    listar,
    registroEstudiante
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
