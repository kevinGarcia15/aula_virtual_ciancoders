import React, { Component } from "react";
//import Button from "reactstrap/lib/Button";
//import {reduxForm } from "redux-form";
//import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import RegisterForm from "../layout/RegisterForm/RegisterForm";

export class MaestroCrear extends Component {
    state = {
        crear: true,
        titulo: "Ingresar Maestro",
    };
    componentWillMount() {
        const { leer, match, listarProfesion } = this.props;
        const id = match.params.id;
        if (id) {
            leer(id);
            this.setState({ crear: false });
            this.setState({ titulo: "Ver Maestro" });
        }

        listarProfesion()
    }
    render() {
        const { registroMaestro, profesion } = this.props;
        
        const selectOpcion = profesion.results.map((obj)=>{
            var retobj={};
            retobj['label']=obj.nombre;
            retobj['value']=obj.id;
            return retobj;
        })

        const funcionEnvio = registroMaestro;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <RegisterForm
                        onSubmit={funcionEnvio}
                        crear={this.state.crear}
                        url="/maestros"
                        titulo={this.state.titulo}
                        selectOpcion={selectOpcion}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default MaestroCrear;
