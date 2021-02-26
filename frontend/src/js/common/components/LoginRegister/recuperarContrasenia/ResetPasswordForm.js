import React from "react";
import { Field, reduxForm } from "redux-form";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";
import { renderField } from "../../Utils/renderField";

const ResetPasswordForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form
            name="contraseniaForm"
            className="form-validate mb-lg d-flex justify-content-center"
            onSubmit={handleSubmit}
        >
            <div className="card w-30 m-4 p-4">
                <h3 className="text-center">Cambio de contraseña</h3>
                <div className="form-group has-feedback">
                    <label htmlFor="password">Nueva Contraseña</label>
                    <Field
                        name="password"
                        label="Contraseña"
                        component={renderField}
                        type="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group has-feedback">
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
                <div className="buttons-box">
                    <button
                        type="submit"
                        className="btn btn-primary m-1 align-self-center"
                    >
                        ACTUALIZAR
                    </button>
                </div>
            </div>
        </form>
    );
};

export const matchPassword = (pass, confirm) =>
    validatorFromFunction((value) => {
        return pass === confirm;
    });
export default reduxForm({
    form: "restPassword", // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
                validators.exists()("Este campo es requerido"),
                matchPassword(data.password, data.confirmPassword)()(
                    "Las contraseñas no coinciden"
                )
            ),
            password: validators.exists()("Este campo es requerido"),
            currentPassword: validators.exists()("Este campo es requerido"),
        });
    },
})(ResetPasswordForm);
