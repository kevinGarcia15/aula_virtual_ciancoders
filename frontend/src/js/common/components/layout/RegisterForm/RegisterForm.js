import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {
    renderField,
    renderNumber,
    renderFilePicker,
    SelectField,
} from "../../Utils/renderField/renderField";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";

export class RegisterForm extends Component {
    render() {
        const Options = [
            { label: "Perito Contador", value: "1" },
            { label: "Bachiller", value: "2" },
        ];
        const { handleSubmit } = this.props;
        return (
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">Usuario</h5>
                                </div>
                                <div className="col-8">
                                    <label>Nombres</label>
                                    <Field
                                        name="first_name"
                                        component={renderField}
                                    />
                                    <label>Apellidos</label>
                                    <Field
                                        name="last_name"
                                        component={renderField}
                                    />
                                    <label>Correo</label>
                                    <Field
                                        name="email"
                                        component={renderField}
                                    />
                                    <label>Usuario</label>
                                    <Field
                                        name="username"
                                        component={renderField}
                                    />
                                    <label htmlFor="password">Contraseña</label>
                                    <Field
                                        name="password"
                                        label="Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"
                                    />
                                    <label htmlFor="confirmPassword">
                                        Confirmar Contraseña
                                    </label>
                                    <Field
                                        name="confirmPassword"
                                        label="Confirmar Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">Perfil</h5>
                                </div>
                                <div className="col-8">
                                    {this.props.estudiante ? null : (
                                        <div>
                                            <label htmlFor="select_field">
                                                profesión
                                            </label>
                                            <Field
                                                name="profesion"
                                                options={Options}
                                                component={SelectField}
                                            />
                                        </div>
                                    )}
                                    <label>Teléfono</label>
                                    <Field
                                        name="phone"
                                        decimalScale={2}
                                        numberFormat="#### #### #### ####"
                                        placeholder="5746 9663"
                                        component={renderNumber}
                                    />
                                    <label>Dirección</label>
                                    <Field
                                        name="address"
                                        component={renderField}
                                    />
                                    {this.props.estudiante ? (
                                        <div className="mt-3">
                                            <label>Teléfono de contacto</label>
                                            <Field
                                                name="telefono_contacto"
                                                decimalScale={2}
                                                numberFormat="#### #### #### ####"
                                                placeholder="5746 9663"
                                                component={renderNumber}
                                            />
                                            <label>Dirección de contacto</label>
                                            <Field
                                                name="direccion_contacto"
                                                component={renderField}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-end">
                                <div className="col-3">
                                    <Link
                                        to="/maestros"
                                        className="btn btn-secondary mr-2"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Registrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export const matchPassword = (pass, confirm) =>
    validatorFromFunction((value) => {
        return pass === confirm;
    });

export default reduxForm({
    form: "maestroForm",
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
                validators.exists()("Este campo es requerido"),
                matchPassword(data.password, data.confirmPassword)()(
                    "Las contraseñas no coinciden"
                )
            ),
            username: validators.exists()("Este campo es requerido"),
            email: validators.exists()("Este campo es requerido"),
            first_name: validators.exists()("Este campo es requerido"),
            last_name: validators.exists()("Este campo es requerido"),
            password: validators.exists()("Este campo es requerido"),
            profesion: validators.exists()("Este campo es requerido"),
            address: validators.exists()("Este campo es requerido"),
            phone: validators.exists()("Este campo es requerido"),
        });
    },
})(RegisterForm);
