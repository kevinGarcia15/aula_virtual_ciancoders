import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validators } from 'validate-redux-form';
import { renderField } from '../../Utils/renderField';

const RecuperarForm = (props) => {
    const { handleSubmit } = props;
    return (
        <form name="loginForm" className="form-validate mb-lg" onSubmit={handleSubmit}>
            <div className="form-group has-feedback">
                <label htmlFor="correo">Correo electronico</label>
                <Field
                    name="correo"
                    label="correo"
                    component={renderField}
                    type="email"
                    className="form-control"
                />
            </div>

            <div className="buttons-box">
                <button type="submit" className="btn btn-primary m-1 align-self-center">Verificar</button>
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'RecuperarForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            correo: validators.exists()('Este campo es requerido'),
        });
    },
})(RecuperarForm);
