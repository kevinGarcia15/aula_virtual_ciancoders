import React, { Component } from "react";
import { Link } from "react-router-dom";
import PortadaForm from "./PortadaForm";
const defaultPortada = require("assets/img/defaultPortada.png");
import '../../../../style/portada.css'

class Portada extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portada: null,
            id_asignacion: null,
            modalIsOpen: false,
        };
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
    handleOpenModal = (e) => {
        this.setState({ modalIsOpen: true });
    };

    handleCloseModal = (e) => {
        this.setState({ modalIsOpen: false });
    };
    render() {
        const { infoAsignacion } = this.props;
        const url = infoAsignacion.portada
            ? infoAsignacion.portada
            : defaultPortada;
        const rol = localStorage.getItem("rol");
        return (
            <React.Fragment>
                    <PortadaForm
                        portadaCurso={infoAsignacion.portada}
                        onSubmit={this.update}
                        setPortada={this.setPortada}
                        onCloseModal={this.handleCloseModal}
                        modalStatus={this.state.modalIsOpen}
                        infoAsignacion={infoAsignacion}
                    />
                <div className="container">
                    <div className="d-flex flex-column align-items-center mt-3">
                        <div className="max-height">
                            <img
                                src={url}
                                alt="Portada"
                                className="img-fluid"
                            />
                        </div>
                        {rol == "Maestro" ? (
                            <a
                                type="button"
                                onClick={this.handleOpenModal}
                                className="mt-2"
                            >
                                <span className="badge d-flex align-items-center badge-pill badge-secondary">
                                    <span className="material-icons mr-1">
                                        add_a_photo
                                    </span>
                                    Añadir foto de portada
                                </span>
                            </a>
                        ) : null}
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center mt-3">
                    <h3 className="">{infoAsignacion.curso}</h3>
                    <p>{`${infoAsignacion.grado} ${infoAsignacion.seccion}`}</p>
                </div>
            </React.Fragment>
        );
    }
}

export default Portada;