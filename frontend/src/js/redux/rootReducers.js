import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

import maestro from './modules/maestro/maestro'
import rolMaestro from './modules/maestro/rolMaestro'
import estudiante from './modules/estudiante/estudiante'
import administrador from './modules/administrador/administrador'
import evento from './modules/evento/evento'
import RolEstudiante from './modules/estudiante/RolEstudiante'
import grado from './modules/grado/grado'
import seccion from './modules/seccion/seccion'
import curso from './modules/curso/curso'
import asignacionMaestro from './modules/asignacionMaestro/asignacion'

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    maestro,
    rolMaestro,
    estudiante,
    administrador,
    evento,
    RolEstudiante,
    grado,
    seccion,
    curso,
    asignacionMaestro
});
