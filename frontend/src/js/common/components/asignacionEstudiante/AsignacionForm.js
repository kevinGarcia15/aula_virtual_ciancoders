import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { AsyncSelectField } from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

class AsignacionForm extends Component {
    render() {
        const {handleSubmit} =  this.props
        const exampleOptions = [
            {"label": "Primary", "value": "Primary"},
            {"label": "Secondary", "value": "Secondary"},
            {"label": "Success", "value": "Success"},
            {"label": "Danger", "value": "Danger"},
            {"label": "Warning", "value": "Warning"},
        ];
        
        const filterOptions = (inputValue) => {
            return exampleOptions.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
            );
        };
        
        const loadOptions = (inputValue, callback) => {
            setTimeout(() => {
                callback(filterOptions(inputValue));
            }, 1000);
        };
        return (
            <form className="d-flex justify-content-star mt-3 mb-4" onSubmit={handleSubmit}>
                <span class="material-icons mt-1">
                search
                </span>
                <div className="w-50 mr-2">
                    <Field
                        name="estudiante"
                        loadOptions={loadOptions}
                        component={AsyncSelectField}
                        placeholder="Estudiantes"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar</button>
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
