import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const DASHBOARD_USER_COUNT = "DASHBOARD_USER_COUNT";
const DASHBOARD_CICLO_COUNT = "DASHBOARD_CICLO_COUNT"

const listar = ()=>(dispach) => {
    api.get("/admin/count_user")
        .then((response) => {
            dispach({ type: DASHBOARD_USER_COUNT, userCount: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

const listarCiclo = ()=>(dispach) => {
    api.get("/admin/ciclo")
        .then((response) => {
            dispach({ type: DASHBOARD_CICLO_COUNT, cicloCount: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    listar,
    listarCiclo,
};

export const reducers = {
    [DASHBOARD_USER_COUNT]: (state, { userCount }) => {
        return {
            ...state,
            userCount,
        };
    },
    [DASHBOARD_CICLO_COUNT]: (state, { cicloCount }) => {
        return {
            ...state,
            cicloCount,
        };
    },

};

export const intialState = {
    loader: false,
    userCount:{},
    cicloCount:{}
};

export default handleActions(reducers, intialState);

