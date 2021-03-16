import React, { Component } from "react";
import EventoListarContainer from "../../evento/eventoListarContainer";
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
                <div className="row justify-content-md-center">
                    <div className="card col-12 col-lg-8 p-2 m-3 justify-content-center overflow-auto">
                        <EventoListarContainer/>
                    </div>
                    <CursosAsignados cursos={cursosMaestro.results} tareas={tareasPendientes}/>
                </div>
            </div>
        );
    }
}

export default DashboardMaestro;