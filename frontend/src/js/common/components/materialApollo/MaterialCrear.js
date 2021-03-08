import React, { Component } from "react";
import MaterialForm from "./MaterialForm";

class MaterialCrear extends Component {
    constructor(props) {
        super(props);
        const { match } = props;
        this.state = {
            id_asignacion: match.params.asignacion,
            titulo: "Crear",
            crear: true,
            archivo: null,
        };
    }
    setArchivo = (archivo) => {
        this.setState({ archivo: archivo });
    };
    crear = (data) => {
        const { crear } = this.props;
        crear(
            { ...data, archivo: null, asignacion: this.state.id_asignacion },
            [{ file: this.state.archivo, name: "archivo" }]
        );
    };
    render() {
        const funcionEnvio = this.crear;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <MaterialForm
                        onSubmit={funcionEnvio}
                        titulo={this.state.titulo}
                        setArchivo={this.setArchivo}
                        id_asignacion={this.state.id_asignacion}
                        crear={this.state.crear}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default MaterialCrear;
