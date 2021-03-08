import { handleActions } from "redux-actions";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { push } from "react-router-redux";

const GUARDAR_MATERIALES_APOLLO = "GUARDAR_MATERIALES_APOLLO";

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
export const actions = {
    listarMaterial,
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
