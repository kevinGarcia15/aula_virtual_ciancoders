import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { initialize as initializeForm } from "redux-form";
import { api } from "api";
import { getMe as refreshUser } from "./login";
import { toLower } from "lodash";

const LOADER = "LOGIN_LOADER";

export const constants = {};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});
// ------------------------------------
// Actions
// ------------------------------------

export const update = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.putAttachments("user/update_me", data, attachments)
        .then((response) => {
            dispatch(refreshUser());
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "EXITO",
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

export const updatePassword = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.put("/user/update_password", data)
        .then((response) => {
            localStorage.setItem("isFirstLogin", false);
            const rol = toLower(localStorage.getItem("rol"));
            NotificationManager.success(
                "Contraseña cambiada exitosamente",
                "SUCCESS",
                3000
            );
            dispatch(push(`/${rol}`));
        })
        .catch((error) => {
            NotificationManager.error(
                error.password,
                "ERROR",
                0
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const verifyEmail = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    api.post("user/emailverify", data)
        .then(() => {
            NotificationManager.success(
                "Se ha enviado un enlace a tu correo electronico, sigue las intrucciones para recuperar tu contraseña",
                "Éxito",
                0
            );
            dispatch(push("/login"));
        })
        .catch(() => {
            NotificationManager.error("Usuario no encontrado", "ERROR", 3000);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const verifiacarTokenResetPass = token => (dispatch) => {
    const data = {
        "token" :token
    }
    api.post("user/verificar_token_reset_pass", data).then((response) => {
        NotificationManager.success(
            "Puede cambiar su contraseña",
            "Éxito",
            3000
        );
    }).catch((error) => {
        NotificationManager.error("El enlace ha expirado o no es valido", "ERROR", 3000);
        dispatch(push("/login"));
    })
};

export const resetPassword = (data) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.put("/user/reset_password", data)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados exitosamente, ahora puede volver a logearse",
                "SUCCESS",
                5000
            );
            dispatch(push("/login"));
        })
        .catch(() => {
            NotificationManager.error(
                "No se pudo actualizar su contrasenia, es probable que el enlace ya vencio",
                "ERROR",
                0
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

export const getMe = () => (dispatch) => {
    api.get("/user/me")
        .then((response) => {
            dispatch(initializeForm("profile", response));
        })
        .catch(() => {})
        .finally(() => {});
};

export const actions = {
    update,
    updatePassword,
    getMe,
    verifyEmail,
    verifiacarTokenResetPass,
    resetPassword,
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
