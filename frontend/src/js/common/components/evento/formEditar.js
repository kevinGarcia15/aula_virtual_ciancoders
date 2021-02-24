import React, { Component } from 'react'
import { reduxForm, Field } from "redux-form";
import {Link} from "react-router-dom"
import {
    renderField,
    renderDatePicker,
    renderTimePicker,
    renderDayPicker
} from "../Utils/renderField/renderField";
import {
    validate,
    validatorFromFunction,
    validators,
    combine,
} from "validate-redux-form";

export class FormEditar extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Crear evento</h4>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    <label>Titulo</label>
                    <Field name="titulo" component={renderField} />
                    <label>Descripcion</label>
                    <Field name="descripcion" component={renderField} />
                    <label>Fecha</label>
                    <Field
                        name="fecha"
                        component={renderDayPicker}
                    />
                    <label>Hora</label>
                    <Field
                        name="hora"
                        component={renderTimePicker}
                    />                        </div>
                <div className="modal-footer">
                    <Link
                        type="button"
                        className="btn btn-danger"
                        data-dismiss="modal"
                        to="/admin"
                        >
                        Cancelar  
                    </Link>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Actualizar
                    </button>
                </div>
            </div>
            </form>

        )
    }
}
export default reduxForm({
    form: "eventoForm",
    validate: (data) => {
        return validate(data, {
            titulo: validators.exists()("Este campo es requerido"),
            descripcion: validators.exists()("Este campo es requerido"),
            fecha: validators.exists()("Este campo es requerido"),
            hora: validators.exists()("Este campo es requerido"),
        });
    },
})(FormEditar);
