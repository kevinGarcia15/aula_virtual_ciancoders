import React, { Component } from "react";
import EstadisticoUsuarios from "./EstadisticoUsuarios";
import EstadisticoCiclo from './EstadisticoCiclo';

export class dashboardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuariosTotales: 0,
        };
    }
    componentWillMount() {
        const { listar, listarCiclo } = this.props;
        listar();
        listarCiclo();
        console.log(this.props)
    }
    render() {
        const { userCount, cicloCount } = this.props;
        return (
            <div className="container">
                <EstadisticoUsuarios totalUsuarios={userCount} />
                <EstadisticoCiclo ciclo={cicloCount}/>
            </div>
        );
    }
}

export default dashboardAdmin;
