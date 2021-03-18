import { handleActions } from "redux-actions";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const GUARDAR_LISTADO_MAESTRO = "GUARDAR_LISTADO_MAESTRO";
const GUARDAR_REGISTRO_MAESTRO = "GUARDAR_REGISTRO_MAESTRO";
const GUARDAR_LISTADO_PROFESION = "GUARDAR_LISTADO_PROFESION";

/**Listar profesiones para usarlo en el select de nuestro formulario */
const listarProfesion = (search) => () => {
    return api.get("/profesion", {search})
        .then((data) => {
            //dispach({ type: GUARDAR_LISTADO_PROFESION, profesion: data });
            if (data) {
                const profesiones = [];
                data.results.forEach((profesion) => {
                    profesiones.push({
                        value: profesion.id,
                        label: profesion.nombre,
                    });
                });
                return profesiones;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro maestros",
                "ERROR",
                3000
            );
        });
};


export const listar = () => (dispach) => {
    api.get("/maestro")
        .then((response) => {
            dispach({ type: GUARDAR_LISTADO_MAESTRO, data: response });
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro maestros",
                "ERROR",
                3000
            );
        });
};

export const registroMaestro = () => (dispatch, getStore) => {
    const data = getStore().form.maestroForm.values;
    const formData={
        "profesion": data.profesion.value,
        "user":{
            "username":data.username,
            "password": data.password,
            "email":data.email,
            "first_name": data.first_name,
            "last_name":data.last_name,
            "profile":{
                "phone": data.phone,
                "address":data.address                
            }
        }
    }
    api.post("/maestro", formData)
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

export const actualizarMaestro = () => (dispatch, getStore) => {
    const data = getStore().form.maestroForm.values;
    const id = data.id
    const formData={
        "profesion": data.profesion.value,
        "user":{
            "first_name": data.first_name,
            "last_name":data.last_name,
            "profile":{
                "phone": data.phone,
                "address":data.address                
            }
        }
    }
    api.put(`/maestro/${id}`, formData)
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


export const leer = (id) => (dispatch) => {
    api.get(`/maestro/${id}`)
        .then((response) => {
            dispatch({type:GUARDAR_REGISTRO_MAESTRO, registro:response})
            const maestro = response.maestro_profile
            const profesion = response.profesion
            const datosForm={
                "id":response.id,
                "address":maestro.address,
                "phone":maestro.phone,
                "rol":maestro.rol,
                "email":maestro.user.email,
                "first_name":maestro.user.first_name,
                "last_name":maestro.user.last_name,
                "username":maestro.user.username,
                "profesion":{"label":profesion.nombre, "value":profesion.id}
            }
            dispatch(initializeForm("maestroForm", datosForm));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        });
};

export const eliminar = (id)=>(dispatch)=>{
    api.eliminar(`/maestro/${id}`)
    .then((response) => {
        NotificationManager.success(
            "Maestro eliminado exitosamente",
            "Exito",
            3000
        );
        dispatch(listar());
    })
    .catch((error) => {
        NotificationManager.error(
            "Ocurrio un error al eliminar el registro",
            "ERROR",
            3000
        );
    });
}

export const actions = {
    listar,
    listarProfesion,
    registroMaestro,
    leer,
    eliminar,
    actualizarMaestro
};

export const reducers = {
    [GUARDAR_LISTADO_MAESTRO]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_LISTADO_PROFESION]: (state, { profesion }) => {
        return {
            ...state,
            profesion,
        };
    },
    [GUARDAR_REGISTRO_MAESTRO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
};

export const intialState = {
    loader: false,
    data: {},
    registro:{},
    profesion:{},
};

export default handleActions(reducers, intialState);
