import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_EMPRESA = "GUARDAR_LISTADO_EMPRESA";
const GUARDAR_REGISRO_EMPRESA = "GUARDAR_REGISTRO_EMPRESA";

export const listar = () => (dispach) => {
    console.log("funcion listar");
    api.get("/empresa")
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_EMPRESA, data: response });
            //            console.log("response:", response);
        })
        .catch((error) => {
            console.log(error);
            dispach({ type: GUARDAR_REGISRO_EMPRESA, registro: response });
            NotificationManager.error(
                "Ocurrio un error listar las empresa",
                "ERROR",
                3000
            );
        });
};

export const leer = (id) => (dispatch) => {
    api.get(`/empresa/${id}`)
        .then((response) => {
            console.log("func leer");
            dispatch(initializeForm("empresa", response));
        })
        .catch((error) => {
            console.log(error);
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};
/**Esta es mi action
 * getStore es el estado que contiene redux y es una funcion
 */
export const registroEmpresa = () => (dispatch, getStore) => {
    const formData = getStore().form.empresa.values;
    api.post("/empresa", formData)
        .then((response) => {
            NotificationManager.success(
                "Empresa crada exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/empresa"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar la empresa",
                "ERROR",
                3000
            );
        });
};

export const actualizarEmpresa = () => (dispatch, getStore) => {
    const formData = getStore().form.empresa.values;
    const id = formData.id;
    api.put(`/empresa/${id}`, formData)
        .then((response) => {
            NotificationManager.success(
                "Empresa actualizada exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/empresa"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al actualizar la empresa",
                "ERROR",
                3000
            );
        });
};

export const eliminar = (id)=>(dispatch)=>{
    api.eliminar(`/empresa/${id}`)
    .then((response) => {
        NotificationManager.success(
            "Empresa eliminada exitosamente",
            "Exito",
            3000
        );
        dispatch(listar());
    })
    .catch((error) => {
        NotificationManager.error(
            "Ocurrio un error al eliminar la empresa",
            "ERROR",
            3000
        );
    });
}

/**Recordar exportar nuestras acciones */
export const actions = {
    registroEmpresa,
    listar,
    leer,
    actualizarEmpresa,
    eliminar,
};

/**Reducers son los que cambian el estado de la app */
export const reducers = {
    [GUARDAR_LISTADO_EMPRESA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_REGISRO_EMPRESA]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
};
/**Recordar que ne redux sempre tiene que haber un estado inicail */

export const intialState = {
    loader: false,
    data: null,
    registro: null,
};

export default handleActions(reducers, intialState);
