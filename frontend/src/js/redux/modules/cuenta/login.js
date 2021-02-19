import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';
const GETME = 'GETME';
const USERPERMISSION = 'USERPERMISSION'

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setMe = me => ({
    type: ME,
    me,
});

export const setUserPermision= userPermission => ({
    type: USERPERMISSION,
    userPermission,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.post('user/token', data).then((response) => {
        if (response.profile.is_first_login) {
            NotificationManager.warning('Debe de cambiar su contraseña', 'ATENCION', 5000);
            localStorage.setItem('token', response.token);
            localStorage.setItem('isFirstLogin', response.profile.is_first_login);
            localStorage.setItem('rol', response.profile.rol);
            dispatch(setMe(response.user));
            dispatch(setUserPermision(response.profile))
            dispatch(push("/cambiocontrasenia"));
        }else{
            localStorage.setItem('token', response.token);
            localStorage.setItem('isFirstLogin', response.profile.is_first_login);
            localStorage.setItem('rol', response.profile.rol);
            dispatch(setMe(response.user));
            dispatch(setUserPermision(response.profile))

            if (response.profile.rol == "Admin") {
                dispatch(push("/admin"));                
            }else if(response.profile.rol == "Maestro"){
                dispatch(push("/maestro"));
            }
        }
    }).catch((err) => {
        NotificationManager.error(err.detail, 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch) => {
    api.get('/user/me').then((response) => {
        dispatch(setUserPermision(response.profile))
        dispatch(setMe(response.user));
    })
        .catch(() => {
    }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    api.post('/user/logout').then(() => {
        dispatch(setMe({}));
        dispatch(setUserPermision({}))
        dispatch(push("/login"));                
    }).catch(() => {
    }).finally(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('isFirstLogin');
    localStorage.removeItem('rol');
};


export const actions = {
    onSubmit,
    logOut,
    getMe
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },

    [USERPERMISSION]: (state, { userPermission }) => {
        return {
            ...state,
            userPermission,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
    userPermission: {},
};

export default handleActions(reducers, initialState);
