import React, { Component } from "react";
import EstadisticoUsuarios from "./EstadisticoUsuarios";

export class dashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuariosTotales: 0,
        };
    }
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }
    render() {
        const { userCount } = this.props;
/*
        const totalMaestros = dashboard.results.filter(
            (item) => item.rol == "Maestro"
        ).length;
        console.log(dashboard)
        const totalEstudiante = dashboard.results.filter(
            (item) => item.rol == "Estudiante"
        ).length;
        const maestrosActivos = dashboard.results.filter(
            (item) => item.activo == true && item.rol == "Maestro"
        ).length;
        const maestrosInactivos = dashboard.results.filter(
            (item) => item.activo == false && item.rol == "Maestro"
        ).length;*/
        return (
            <div className="container">
                <EstadisticoUsuarios
                    totalUsuarios={userCount}
                />
            </div>
        );
    }
}

export default dashboardAdmin;
