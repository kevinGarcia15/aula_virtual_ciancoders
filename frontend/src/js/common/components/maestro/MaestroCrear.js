import React, { Component } from "react";
import RegisterForm from "../layout/RegisterForm/RegisterForm";

export class MaestroCrear extends Component {
    state = {
        crear: true,
        titulo: "Ingresar Maestro",
    };
    componentWillMount() {
        const { leer, match} = this.props;
        const id = match.params.id;
        if (id) {
            leer(id);
            this.setState({ crear: false });
            this.setState({ titulo: "Maestro" });
        }
    }
    render() {
        const { registroMaestro, listarProfesion, actualizarMaestro} = this.props;
        const funcionEnvio = this.state.crear ? registroMaestro : actualizarMaestro;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <RegisterForm
                        onSubmit={funcionEnvio}
                        crear={this.state.crear}
                        url="/maestros"
                        titulo={this.state.titulo}
                        selectOpcion={listarProfesion}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default MaestroCrear;
