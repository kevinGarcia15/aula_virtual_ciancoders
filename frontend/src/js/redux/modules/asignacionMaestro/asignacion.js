import { handleActions } from "redux-actions";
import { createReducer } from "../baseReducer/baseReducer";
import { NotificationManager } from "react-notifications";
import { api } from "api";
import { push } from "react-router-redux";
// ------------------------------------
// Constants
// ------------------------------------

export const { reducers, initialState, actions } = createReducer(
    "asigncion",
    "asignaciones",
    "asignacionForm",
    "/asigncion"
);

const crearAsignacion = (data) => (dispatch) => {
    const formData={
        maestro : data.maestro.value,
        curso : data.curso.value,
        seccion : data.seccion.value,
        grado : data.grado.value,
        asignacion_ciclo : data.asignacion_ciclo.value,
        descripcion : data.descripcion
    }
    console.log(formData)
    api.post("/asignaciones", formData)
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
const obtenerMaestros = (search) => () => {
    return api
        .get("/maestro", { search })
        .then((data) => {
            if (data) {
                const maestros = [];
                data.results.forEach((maestro) => {
                    maestros.push({
                        value: maestro.id,
                        label: maestro.maestro_profile.user.first_name,
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


actions["obtenerMaestros"] = obtenerMaestros;
actions["obtenerCursos"] = obtenerCursos;
actions["obtenerSecciones"] = obtenerSecciones;
actions["obtenerGrados"] = obtenerGrados;
actions["obtenerCiclos"] = obtenerCiclos;
actions["crearAsignacion"] = crearAsignacion;

export default handleActions(reducers, initialState);