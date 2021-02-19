import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

export const actions = {
};

export const reducers = {
};

export const intialState = {
    loader: false,
    cursosAsignados:{},
    tareasPendientes:{},
};

export default handleActions(reducers, intialState);