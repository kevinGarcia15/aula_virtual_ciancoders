import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "reactstrap/lib/Button";
import {reduxForm } from "redux-form";
import ProfileForm from "../layout/RegisterForm/ProfileForm";
import UserForm from "../layout/RegisterForm/UserForm";


export class MaestroForm extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="container mt-3">
                    <h3 className="text-center">Ingresar maestro</h3>
                    <form action="" className="row">
                    <UserForm/>
                    <ProfileForm/>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default reduxForm({
    form: "maestroForm",
})(MaestroForm);
