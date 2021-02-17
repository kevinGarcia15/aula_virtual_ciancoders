import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';

import maestro from './modules/maestro/maestro'
import estudiante from './modules/estudiante/estudiante'
import administrador from './modules/administrador/administrador'

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    maestro,
    estudiante,
    administrador,
});
