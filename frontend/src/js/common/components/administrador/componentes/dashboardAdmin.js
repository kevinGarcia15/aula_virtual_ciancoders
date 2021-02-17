import React, { Component } from "react";
import EstadisticoUsuarios from "./EstadisticoUsuarios";
import EstadisticoCiclo from "./EstadisticoCiclo";

export class dashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuariosTotales: 0,
        };
    }
    componentDidMount() {
        const { listar, listarCiclo, listarNivel } = this.props;
        listar();
        listarCiclo();
        listarNivel();
    }
    render() {
        const { userCount, cicloCount, niveles } = this.props;
        return (
            <div className="container">
                <EstadisticoUsuarios totalUsuarios={userCount} />
                <EstadisticoCiclo ciclo={cicloCount} niveles={niveles} />
            </div>
        );
    }
}

export default dashboardAdmin;
