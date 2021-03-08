import { handleActions } from "redux-actions";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";

const LOADER = "ASIGNACION_LOADER";
const GUARDAR_MATERIALES_APOLLO = "GUARDAR_MATERIALES_APOLLO";

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
//            dispatch(push(`/asignacion/${data.asignacion}/estudiantes`));
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const actions = {
    listarMaterial,
    crear,
};

export const reducers = {
    [GUARDAR_MATERIALES_APOLLO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

export const initialState = {
    loader: false,
    data: {},
};

export default handleActions(reducers, initialState);
