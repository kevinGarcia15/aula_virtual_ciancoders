import {handleActions} from 'redux-actions';
import {createReducer} from "../baseReducer/baseReducer";
import {api} from "api"
import {NotificationManager} from "react-notifications"
import { push } from "react-router-redux";



// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "grado",
    "grados",
    "gradoForm",
    "/grado",
);

export const crearGrado = (data) => (dispatch) => {
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
            dispatch(push("/maestros"));
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
export default handleActions(reducers, initialState);