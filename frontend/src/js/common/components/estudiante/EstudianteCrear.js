import React, { Component } from "react";
import RegisterForm from "../layout/RegisterForm/RegisterForm";

export class EstudianteCrear extends Component {
    state = {
        crear:true,
    }
    componentWillMount() {

    }
        render() {
        const { registroEstudiante } = this.props;
        const funcionEnvio = registroEstudiante;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <h3 className="text-center">Ingresar Estudiante</h3>
                    <RegisterForm onSubmit={funcionEnvio} estudiante/>
                </div>
            </React.Fragment>
        );
    }
}

export default EstudianteCrear;
