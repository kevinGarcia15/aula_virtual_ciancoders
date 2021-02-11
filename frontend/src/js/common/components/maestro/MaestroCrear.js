import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import {reduxForm } from "redux-form";
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import RegisterForm from "../layout/RegisterForm/RegisterForm";

export class MaestroCrear extends Component {
        render() {
        const { registroMaestro} = this.props;
        const funcionEnvio = registroMaestro;
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <h3 className="text-center">Ingresar maestro</h3>
                    <RegisterForm onSubmit={funcionEnvio}/>
                </div>
            </React.Fragment>
        );
    }
}

export default MaestroCrear;