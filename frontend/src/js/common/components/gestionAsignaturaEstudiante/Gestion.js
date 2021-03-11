import React, { Component } from "react";
import PortadaContainer from "../asignacion/PortadaContainer";
import MaterialListarContainer from "../materialApollo/MaterialListarContainer";
import TareaListarContainer from "../tarea/TareaListarContainer";

export class Gestion extends Component {
    render() {
        const { match } = this.props;
        const id_asignacion = match.params.id;
        return (
            <React.Fragment>
                <PortadaContainer id={parseInt(id_asignacion)} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 card mt-3">
                            <TareaListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                        <div className="col-lg-1"></div>
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

export default Gestion;
