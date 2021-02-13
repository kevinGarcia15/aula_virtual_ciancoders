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
        let editar = window.location.href.includes("editar");
        let disabled = false;
        const { handleSubmit, crear, url, titulo, selectOpcion } = this.props;

        crear==false && editar==false ? (disabled = true) : (disabled = false);
        return (
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <Link to={url} className="btn btn-primary btn-sm">Atras</Link>
                    <h3 className="text-center">{titulo}</h3>
                </div>
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
                                        disabled={disabled}
                                    />
                                    <label>Apellidos</label>
                                    <Field
                                        name="last_name"
                                        component={renderField}
                                        disabled={disabled}
                                    />
                                    <label>Correo</label>
                                    <Field
                                        name="email"
                                        component={renderField}
                                        disabled={disabled}
                                    />
                                    <label>Usuario</label>
                                    <Field
                                        name="username"
                                        component={renderField}
                                        disabled={disabled}
                                    />
                                    {crear ? 
                                        <div>
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
                                        </div>:
                                        null
                                    }
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
                                        <div className="mb-3">
                                            <label htmlFor="select_field">
                                                profesión
                                            </label>
                                            <Field
                                                name="profesion"
                                                options={selectOpcion}
                                                component={SelectField}
                                                disabled={disabled}

                                            />
                                        </div>
                                    )}
                                    <label>Teléfono</label>
                                    <Field
                                        name="phone"
                                        decimalScale={2}
                                        numberFormat="#### #### #### ####"
                                        component={renderNumber}
                                        disabled={disabled}
                                    />
                                    <label>Dirección</label>
                                    <Field
                                        name="address"
                                        component={renderField}
                                        disabled={disabled}
                                    />
                                    {this.props.estudiante ? (
                                        <div className="mt-3">
                                            <label>Teléfono de contacto</label>
                                            <Field
                                                name="telefono_contacto"
                                                decimalScale={2}
                                                numberFormat="#### #### #### ####"
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
                {crear||editar ?
                <div className="col-12 mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row justify-content-end">
                                <div className="col-3">
                                    <Link
                                        to={url}
                                        className="btn btn-secondary mr-2"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
                null
                }
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
        });
    },
})(RegisterForm);
