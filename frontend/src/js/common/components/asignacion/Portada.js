import React, { Component } from "react";
import { Link } from "react-router-dom";
import PortadaForm from "./PortadaForm";
const defaultPortada = require("assets/img/defaultPortada.png");

class Portada extends Component {
    constructor(props) {
        super(props);
        this.state = { portada: null, id_asignacion: null };
    }
    componentWillMount() {
        const { id, leer } = this.props;
        this.setState({ id_asignacion: id });
        leer(id);
    }
    setPortada = (portada) => {
        this.setState({ portada: portada });
    };

    update = (data) => {
        const { actualizarAsignacion } = this.props;
        actualizarAsignacion(
            { ...data, portada: null, asignacion: this.state.id_asignacion },
            [{ file: this.state.portada, name: "portada" }]
        );
    };
    render() {
        const { infoAsignacion } = this.props;
        const url = infoAsignacion.portada ? infoAsignacion.portada : defaultPortada;
        console.log;
        return (
            <div className="container">
                <PortadaForm
                    portadaCurso={infoAsignacion.portada}
                    onSubmit={this.update}
                    setPortada={this.setPortada}
                />
                <div className="d-flex flex-column align-items-center mt-3">
                    <img
                        src={url}
                        alt="Portada"
                        className="mx-auto d-block img-fluid rounded"
                    />
                    <Link to="portada" className="mt-2">
                        <span className="badge d-flex align-items-center badge-pill badge-secondary">
                            <span className="material-icons mr-1">
                                add_a_photo
                            </span>
                            Añadir foto de portada
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Portada;
