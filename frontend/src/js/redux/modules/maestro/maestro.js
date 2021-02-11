import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_MAESTRO = "GUARDAR_LISTADO_MAESTRO";
export const listar = () => (dispach) => {
    api.get("/maestro")
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_MAESTRO, data: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar las empresa",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    listar,
};

export const reducers = {
    [GUARDAR_LISTADO_MAESTRO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

export const intialState = {
    loader: false,
    data: {},
};

export default handleActions(reducers, intialState);