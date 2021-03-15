import React, { Component } from "react";
import EventoListarContainer from "../../evento/eventoListarContainer";
import MisCursos from "./MisCursos";
import Tareas from "./Tareas";

export class DashboardEstudiante extends Component {
    componentDidMount() {
        const { misCursos, tareasPendientes } = this.props;
        misCursos();
        tareasPendientes();
    }
    render() {
        const { cursosAsignados, tareasEntregar } = this.props;
        console.log(this.props);
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="card col-12 col-lg-8 p-2 mb-4 mt-4 justify-content-center overflow-auto">
                        <EventoListarContainer />
                    </div>
                    <Tareas tareas={tareasEntregar.tareas_entregar} />
                    <div className="col-lg-1"></div>
                    <MisCursos cursos={cursosAsignados.results} />
                </div>
            </div>
        );
    }
}

export default DashboardEstudiante;
