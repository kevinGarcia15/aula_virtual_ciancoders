import React, { Component } from "react";
import EventoListarContainer from "../../evento/eventoListarContainer";

export class EstadisticoUsuarios extends Component {
    render() {
        const {
            usuariosTotales,
            totalMaestros,
            maestrosActivos,
            maestrosInactivos,
            totalEstudiantes,
            estudiantesActivos,
            estudiantesInactivos,
        } = this.props.totalUsuarios;
        return (
            <div className="row">
                <div className="card col-12 col-lg-10 p-2 m-3">
                    <EventoListarContainer />
                </div>
                <div className="card col-12 col-lg-3 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Usuarios Totales
                        </h6>
                        <h1 className="card-text text-dark text-center">
                            {usuariosTotales}
                        </h1>
                    </div>
                </div>
                <div className="card col-12 col-lg-3 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Catedraticos registrados
                        </h6>
                        <h1 className="card-text text-dark text-center">
                            {totalMaestros}
                        </h1>
                        <div className="d-flex flex-column">
                            <p className="m-0 text-sm-left">
                                Activos: {maestrosActivos}
                            </p>
                            <p className="m-0 text-sm-left">
                                Inactivos: {maestrosInactivos}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card col-12 col-lg-3 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Estudiantes registrados
                        </h6>
                        <h1 className="card-text text-dark text-center">
                            {totalEstudiantes}
                        </h1>
                        <div className="d-flex flex-column">
                            <p className="m-0 text-sm-left">
                                Activos: {estudiantesActivos}
                            </p>
                            <p className="m-0 text-sm-left">
                                Inactivos: {estudiantesInactivos}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EstadisticoUsuarios;
