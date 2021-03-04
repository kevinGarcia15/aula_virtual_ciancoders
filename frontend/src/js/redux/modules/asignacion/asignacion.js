import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";

// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_REGISTRO_ASIGNACION = "GUARDAR_REGISTRO_ASIGNACION"

const LOADER = "ASIGNACION_LOADER";

export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});

const leer = id => (dispatch) => {
    api.get(`asignaciones/${id}`).then((response) => {
        dispatch({type:GUARDAR_REGISTRO_ASIGNACION, infoAsignacion:response})
    }).catch(() => {
    }).finally(() => {
    });
};

export const actualizarAsignacion = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments("asignaciones/actualizar_portada", data, attachments)
        .then((response) => {
            dispatch(leer(data.asignacion));
            dispatch(initializeForm("asignacionPortadaForm", {}));
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "ERROR",
                1000
            );
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
    leer,
    actualizarAsignacion,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [GUARDAR_REGISTRO_ASIGNACION]: (state, { infoAsignacion }) => {
        return {
            ...state,
            infoAsignacion,
        };
    },
};

export const intialState = {
    loader: false,
    infoAsignacion: {}
};

export default handleActions(reducers, intialState);