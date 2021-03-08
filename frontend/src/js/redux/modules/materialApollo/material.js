import { handleActions } from "redux-actions";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";

const LOADER = "ASIGNACION_LOADER";
const GUARDAR_MATERIALES_APOLLO = "GUARDAR_MATERIALES_APOLLO";
const GUARDAR_MATERIAL_APOLLO = "GUARDAR_MATERIAL_APOLLO";


export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});

const listarMaterial = (id) => (dispatch) => {
    api.get("materiales/asignacion/", { id }).then((response) => {
        const data = {
            results: response.material,
        };
        dispatch({
            type: GUARDAR_MATERIALES_APOLLO,
            data: data,
        });
    });
};

export const crear = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.postAttachments("materiales", data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Registro creada exitosamente",
                "SUCCESS",
                2000
            );
            dispatch(push(`/asignacion/${data.asignacion}/estudiantes`));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const leer = (id) => (dispatch) => {
    api.get(`materiales/${id}`)
        .then((response) => {
            dispatch(initializeForm("materialForm", response));
            dispatch({
                type: GUARDAR_MATERIAL_APOLLO,
                leerMaterial: response,
            });
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {});
};

export const actualizar = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    
    api.putAttachments(`materiales/${data.id}`, data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "ERROR",
                1000
            );
            dispatch(push(`/asignacion/${data.asignacion}/estudiantes`));
        })
        .catch(() => {
            NotificationManager.error(
                "Credenciales incorrectas, vuelva a intentar",
                "ERROR",
                0
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    listarMaterial,
    crear,
    leer,
    actualizar
};

export const reducers = {
    [GUARDAR_MATERIALES_APOLLO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_MATERIAL_APOLLO]: (state, { leerMaterial }) => {
        return {
            ...state,
            leerMaterial,
        };
    },
};

export const initialState = {
    loader: false,
    data: {},
    leerMaterial:{}, 
};

export default handleActions(reducers, initialState);
