import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const DASHBOARD_USER_COUNT = "DASHBOARD_USER_COUNT";

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

export const actions = {
    listar,
};

export const reducers = {
    [DASHBOARD_USER_COUNT]: (state, { userCount }) => {
        return {
            ...state,
            userCount,
        };
    },
};

export const intialState = {
    loader: false,
    userCount:{}
};

export default handleActions(reducers, intialState);

