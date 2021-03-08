import React, { Component } from "react";

import TareaForm from "./TareaForm";

class TareaCrear extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const id_asignacion = match.params.asignacion;
        this.state = {
            crear: true,
            titulo: "Crear",
            archivo: null,
            id_asignacion: id_asignacion,
        };
    }
    componentDidMount() {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id) {
            leer(id);
            this.setState({
                crear: false,
                titulo: "Ver",
            });
        }
    }
    setArchivo = (archivo) => {
        this.setState({ archivo: archivo });
    };

    crear = (data) => {
        const { crear } = this.props;
        const id_asignacion = this.state.id_asignacion;
        crear({ ...data, archivo: null, asignacion: id_asignacion }, [
            { file: this.state.archivo, name: "archivo" },
        ]);
    };

    update = (data) => {
        const { actualizar} = this.props;
        actualizar(
            { ...data, archivo: null, asignacion: this.state.id_asignacion },
            [{ file: this.state.archivo, name: "archivo" }]
        );
    };
    render() {
        const {leerTarea}= this.props
        const funcionEnvio = this.state.crear ? this.crear: this.update;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <TareaForm
                        onSubmit={funcionEnvio}
                        titulo={this.state.titulo}
                        setArchivo={this.setArchivo}
                        id_asignacion={this.state.id_asignacion}
                        infoTarea={leerTarea}
                        crear={this.state.crear}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default TareaCrear;
