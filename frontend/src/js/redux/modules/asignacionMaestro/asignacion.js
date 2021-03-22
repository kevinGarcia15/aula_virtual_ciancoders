import { handleActions } from "redux-actions";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------
const GUARDAR_LISTADO_ASIGNACIONES = "GUARDAR_LISTADO_ASIGNACIONES"
const GUARDAR_PAGINA = "GUARDAR_PAGINA"

const listar = (page=1)=>(dispatch)=>{
    const params = {page}
    api.get("/asignaciones", params)
        .then((response)=>{
            dispatch({
                type: GUARDAR_LISTADO_ASIGNACIONES,
                data: response,
            });
            dispatch({
                type:GUARDAR_PAGINA,
                pagina:page
            })
        })
        .catch((error)=>{
            NotificationManager.error(
                "Ocurrio un error al obtener los datos",
                "ERROR",
                3000
            );
        })
}
const crearAsignacion = (data) => (dispatch) => {
    const formData={
        maestro : data.maestro.value,
        curso : data.curso.value,
        seccion : data.seccion.value,
        grado : data.grado.value,
        asignacion_ciclo : data.asignacion_ciclo.value,
        descripcion : data.descripcion
    }
    api.post("/asignaciones", formData)
        .then((response) => {
            NotificationManager.success(
                "Registro crado exitosamente",
                "Exito",
                3000
            );
            dispatch(push("/asignacion/listar"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error al registrar al maestro",
                "ERROR",
                3000
            );
        });
};
const obtenerMaestros = (search) => () => {
    return api
        .get("/maestro", { search })
        .then((data) => {
            if (data) {
                const maestros = [];
                data.results.forEach((maestro) => {
                    maestros.push({
                        value: maestro.id,
                        label: `${maestro.maestro_profile.user.first_name} ${maestro.maestro_profile.user.last_name}`,
                    });
                });
                return maestros;
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

const obtenerCursos = (search) => () => {
    return api
        .get("/cursos", { search })
        .then((data) => {
            if (data) {
                const cursos = [];
                data.results.forEach((curso) => {
                    cursos.push({
                        value: curso.id,
                        label: curso.nombre,
                    });
                });
                return cursos;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro cursos",
                "ERROR",
                3000
            );
        });
};

const obtenerSecciones = (search) => () => {
    return api
        .get("/secciones", { search })
        .then((data) => {
            if (data) {
                const secciones = [];
                data.results.forEach((seccion) => {
                    secciones.push({
                        value: seccion.id,
                        label: seccion.nombre,
                    });
                });
                return secciones;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro seccion",
                "ERROR",
                3000
            );
        });
};

const obtenerGrados = (search) => () => {
    return api
        .get("/grados", { search })
        .then((data) => {
            if (data) {
                const grados = [];
                data.results.forEach((grado) => {
                    grados.push({
                        value: grado.id,
                        label: `${grado.nombre} ${grado.nivel.nombre}`,
                    });
                });
                return grados;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro seccion",
                "ERROR",
                3000
            );
        });
};


const obtenerCiclos = (search) => () => {
    return api
        .get("/ciclos", { search })
        .then((data) => {
            if (data) {
                const ciclos = [];
                data.results.forEach((ciclo) => {
                    ciclos.push({
                        value: ciclo.id,
                        label: ciclo.anio,
                    });
                });
                return ciclos;
            }
        })
        .catch((error) => {
            NotificationManager.error(
                "Ocurrio un error listar el registro seccion",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    listar, 
    obtenerMaestros,
    obtenerCursos,
    obtenerSecciones,
    obtenerGrados,
    obtenerCiclos,
    crearAsignacion
};

export const reducers = {
    [GUARDAR_LISTADO_ASIGNACIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_PAGINA]:(state,{pagina})=>{
        return{
            ...state,
            pagina
        }
    }
}

export const initialState = {
    loader: false,
    data:{}
}
export default handleActions(reducers, initialState);
