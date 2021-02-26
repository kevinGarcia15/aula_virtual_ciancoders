import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';

import CambioContraseniaContainer from './common/components/LoginRegister/Profile/CambioContraseniaContainer'
import RecuperarContainer from './common/components/LoginRegister/recuperarContrasenia/RecuperarContainer'
import ResetPasswordContainer from './common/components/LoginRegister/recuperarContrasenia/ResetPasswordContainer'

import MaestrosListContainer from './common/components/maestro/MaestroListContainer'
import MaestroCrearContainer from './common/components/maestro/MaestroCrearContainer'

import EstudianteListContainer from './common/components/estudiante/EstudianteListContainer'
import EstudianteCrearContainer from './common/components/estudiante/EstudianteCrearContainer'

import EventoEditarContainer from './common/components/evento/eventoEditarContainer'

import DashboardAdminContainer from './common/components/administrador/dashboardAdminContainer'
import DashboardMaestroContainer from './common/components/maestro/dashboard/dashboardMaestroContainer'
import DashboardEstudianteContainer from './common/components/estudiante/dashboard/DashboardEstudianteContainer'

import GradoListarContainer from './common/components/grado/GradoListarContainer'
import GradoCrearContainer from './common/components/grado/GradoCrearContainer'

import SeccionListarContainer from './common/components/seccion/SeccionListarContainer'
import SeccionCrearContainer from './common/components/seccion/SeccionCrearContainer'

import CursoListarContainer from './common/components/curso/CursoListarContainer'
import CursoCrearContainer from './common/components/curso/CursoCrearContainer'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/fonts/fonts.css';
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../../node_modules/font-awesome/css/font-awesome.css');
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/admin" component={DashboardAdminContainer} />
                <ProtectedRoute exact path="/maestro" component={DashboardMaestroContainer} />
                <ProtectedRoute exact path="/estudiante" component={DashboardEstudianteContainer} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />

                <Route exact path="/cambiocontrasenia" component={CambioContraseniaContainer} />
                <Route exact path="/forgotpassword" component={RecuperarContainer} />
                <Route exact path="/resetpassword/:token" component={ResetPasswordContainer} />

                <ProtectedRoute exact path="/maestros" component={MaestrosListContainer} />
                <ProtectedRoute exact path="/maestros/crear" component={MaestroCrearContainer} />
                <ProtectedRoute exact path="/maestros/:id" component={MaestroCrearContainer} />

                <ProtectedRoute exact path="/estudiantes" component={EstudianteListContainer} />
                <ProtectedRoute exact path="/estudiantes/crear" component={EstudianteCrearContainer} />
                <ProtectedRoute exact path="/estudiantes/:id" component={EstudianteCrearContainer} />

                <ProtectedRoute exact path="/evento/:id/editar" component={EventoEditarContainer} />

                <ProtectedRoute exact path="/grado/" component={GradoListarContainer} />
                <ProtectedRoute exact path="/grado/crear" component={GradoCrearContainer} />
                <ProtectedRoute exact path="/grado/:id/editar" component={GradoCrearContainer} />
                
                <ProtectedRoute exact path="/seccion/" component={SeccionListarContainer} />
                <ProtectedRoute exact path="/seccion/crear" component={SeccionCrearContainer} />
                <ProtectedRoute exact path="/seccion/:id/editar" component={SeccionCrearContainer} />

                <ProtectedRoute exact path="/curso/" component={CursoListarContainer} />
                <ProtectedRoute exact path="/curso/crear" component={CursoCrearContainer} />
                <ProtectedRoute exact path="/curso/:id/editar" component={CursoCrearContainer} />

                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
