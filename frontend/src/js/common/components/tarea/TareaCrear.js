import React, { Component } from "react";

import TareaForm from "./TareaForm";

class TareaCrear extends Component {
    state = {
        titulo: "Crear",
        archivo: null,
    };
    setArchivo = (archivo) => {
        this.setState({ archivo: archivo });
    };
    crear = (data) => {
        const { crear, match } = this.props;
        const id_asignacion = match.params.id;
        console.log(match.params.id)
        crear({ ...data, archivo: null, asignacion: id_asignacion }, [
            { file: this.state.archivo, name: "archivo" },
        ]);
    };
    render() {
        const funcionEnvio = this.crear;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <TareaForm
                        onSubmit={funcionEnvio}
                        titulo={this.state.titulo}
                        setArchivo={this.setArchivo}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default TareaCrear;
