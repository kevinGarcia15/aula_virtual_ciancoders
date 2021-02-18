import React, { Component } from "react";
import CursosAsignados from "./cursosAsignados";

export class DashboardMaestro extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { cursosAsignados, tareas} = this.props;
        cursosAsignados();
        tareas();
    }

    render() {
        const { cursosMaestro, tareasPendientes} = this.props;
        
        return (
            <div className="container">
                <div className="row">
                    <CursosAsignados cursos={cursosMaestro.maestro} tareas={tareasPendientes}/>
                </div>
            </div>
        );
    }
}

export default DashboardMaestro;