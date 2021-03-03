import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { AsyncSelectField } from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

class AsignacionForm extends Component {
    render() {
        const {handleSubmit, obtenerEstudiantes} =  this.props
        return (
            <form className="d-flex justify-content-star mt-3 mb-4" onSubmit={handleSubmit}>
                <span className="material-icons mt-1">
                search
                </span>
                <div className="w-50 mr-2">
                    <Field
                        name="estudiante"
                        loadOptions={obtenerEstudiantes}
                        component={AsyncSelectField}
                        placeholder="Estudiantes"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar al curso</button>
            </form>
        );
    }
}

export default reduxForm({
    form: "maestroForm",
    validate: (data) => {
        return validate(data, {
            estudiante: validators.exists()("Este campo es requerido"),
        });
    },
})(AsignacionForm);
