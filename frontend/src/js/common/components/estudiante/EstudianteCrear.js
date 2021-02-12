import React, { Component } from "react";
import RegisterForm from "../layout/RegisterForm/RegisterForm";

export class EstudianteCrear extends Component {
    state = {
        crear: true,
        titulo: "Ingresar Estudiante",
    };
    componentWillMount() {
        const { leer, match } = this.props;
        const id = match.params.id;
        if (id) {
            leer(id);
            this.setState({ crear: false });
            this.setState({ titulo: "Ver Estudiante" });
        }
    }
    render() {
        const { registroEstudiante } = this.props;
        const funcionEnvio = registroEstudiante;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <RegisterForm
                        onSubmit={funcionEnvio}
                        estudiante
                        crear={this.state.crear}
                        url="/estudiantes"
                        titulo={this.state.titulo}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default EstudianteCrear;
