import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from 'redux-form';
import { api } from "api";
import {setMe} from "./login";

const LOADER = 'LOGIN_LOADER';

export const constants = {
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});
// ------------------------------------
// Actions
// ------------------------------------

export const update = (data = {}, attachments=[]) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments('user/update_me', data, attachments).then((response) => {
        dispatch(setMe(response));
        NotificationManager.success('Datos actualizados exitosamente', 'ERROR', 1000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const updatePassword = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.put('/user/update_password', data).then((response) => {
        localStorage.setItem('isFirstLogin', false);
        NotificationManager.success('Datos actualizados exitosamente', 'SUCCESS', 3000);
        dispatch(push("/"));
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch) => {
    api.get('/user/me').then((response) => {
        console.log({"getMe":response})
        dispatch(initializeForm('profile', response));
    })
        .catch(() => {
    }).finally(() => {});
};

export const actions = {
    update,
    updatePassword,
    getMe
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
};

export const initialState = {
    loader: false,
};

export default handleActions(reducers, initialState);
