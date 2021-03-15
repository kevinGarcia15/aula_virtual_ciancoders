import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import AsignacionForm from "./asignacionEstudiante/AsignacionForm";
import PortadaContainer from "../asignacion/PortadaContainer";
import TareaListarContainer from "../tarea/TareaListarContainer";
import MaterialListarContainer from "../materialApollo/MaterialListarContainer";
import AsigEstudianteContainer from "./asignacionEstudiante/AsigEstudianteContainer";

class GestionAsignatura extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const id = match.params.id;
        this.state = {
            id_asignacion: id,
        };
    }
    componentDidMount() {}

    render() {
        const id_asignacion = this.state.id_asignacion;
        return (
            <React.Fragment>
                <PortadaContainer id={parseInt(id_asignacion)} />
                <div className="container">
                    <div className="row">
                        <div className="col-12 mr-3 card">
                            <AsigEstudianteContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                        <div className="col-lg-6 col-12 card mt-3">
                            <TareaListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                        <div className="col-lg-1 col-1"></div>
                        <div className="col-lg-5 col-12 card mt-3">
                            <MaterialListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default GestionAsignatura;
