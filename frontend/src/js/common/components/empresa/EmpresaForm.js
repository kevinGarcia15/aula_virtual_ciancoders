import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { renderField } from "../Utils/renderField/renderField";

export class EmpresaForm extends Component {
    render() {
        const { handleSubmit, crear } = this.props;
        let disabled = false;
        let editar = window.location.href.includes("editar");
        console.log(editar)
        console.log(crear)
        crear==false && editar==false ? (disabled = true) : (disabled = false);
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <Field
                        name="nombre"
                        component={renderField}
                        disabled={disabled}
                    />
                    <label>Pais</label>
                    <Field
                        name="lugar"
                        component={renderField}
                        disabled={disabled}
                    />
                    <Link to='/empresa' className="btn btn-secondary btn-sm mr-2">
                        Cancelar
                    </Link>
                    {disabled ? null : (
                        <button type="submit" className="btn btn-primary">
                            {editar?'Actualizar' : "Registrar"}
                        </button>
                    )}
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "empresa",
})(EmpresaForm);
