import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import {api} from "api"
import {NotificationManager} from "react-notifications"
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';

// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "grado",
    "grados",
    "gradoForm",
    "/grado",
);

const leerGrado = id => (dispatch) => {
    api.get(`grados/${id}`).then((response) => {
        response.nivel = {value:response.nivel.id, label:response.nivel.nombre}
        dispatch(initializeForm("gradoForm", response));
    }).catch(() => {
    }).finally(() => {

    });
};

const editarGrado = (id, data) => (dispatch) => {
    const formData={
        nivel : data.nivel.value,
        nombre :  data.nombre,
        descripcion : data.descripcion
    }
    api.put(`grados/${id}`, formData).then(() => {
        NotificationManager.success('Registro actualizado', 'Éxito', 3000);
        dispatch(push("/grado"));
    }).catch(() => {
        NotificationManager.error('Error en la edición', 'ERROR', 0);
    }).finally(() => {

    });
};

const crearGrado = (data) => (dispatch) => {
    const formData={
        nivel : data.nivel.value,
        nombre :  data.nombre,
        descripcion : data.descripcion
    }
    api.post("/grados", formData)
        .then((response) => {
            NotificationManager.success(
                "Registro crado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/grado"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar al maestro",
                "ERROR",
                3000
            );
        });
};

actions["crearGrado"] = crearGrado
actions["editarGrado"] = editarGrado
actions["leerGrado"] = leerGrado
export default handleActions(reducers, initialState);