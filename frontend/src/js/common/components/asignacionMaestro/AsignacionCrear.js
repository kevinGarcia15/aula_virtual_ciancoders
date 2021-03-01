import React, { Component } from "react";
import AsignacionForm from "./AsignacionForm";

class AsignacionCrear extends Component {
    render() {
        const {
            crear,
            obtenerMaestros,
            obtenerCursos,
            obtenerSecciones,
            obtenerGrados,
            obtenerCiclos,
        } = this.props;
        const funcionEnvio = crear;
        return (
            <div className="container mt-4">
                <AsignacionForm
                    onSubmit={funcionEnvio}
                    obtenerMaestros={obtenerMaestros}
                    obtenerCursos={obtenerCursos}
                    obtenerSecciones={obtenerSecciones}
                    obtenerGrados={obtenerGrados}
                    obtenerCiclos={obtenerCiclos}
                />
            </div>
        );
    }
}

export default AsignacionCrear;
