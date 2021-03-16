import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import {
    renderField,
    AsyncSelectField,
} from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

class AsignacionForm extends Component {
    render() {
        const {
            handleSubmit,
            obtenerMaestros,
            obtenerCursos,
            obtenerSecciones,
            obtenerGrados,
            obtenerCiclos,
        } = this.props;
        return (
            <form
                className="row justify-content-center"
                onSubmit={handleSubmit}
            >
                <div className="col-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">Asignación</h5>
                                </div>
                                <div className="col-8">
                                    <div className="mt-2">
                                        <label htmlFor="maestro">Maestro</label>
                                        <Field
                                            name="maestro"
                                            loadOptions={obtenerMaestros}
                                            component={AsyncSelectField}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="curso">Curso</label>
                                        <Field
                                            name="curso"
                                            loadOptions={obtenerCursos}
                                            component={AsyncSelectField}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="seccion">Sección</label>
                                        <Field
                                            name="seccion"
                                            loadOptions={obtenerSecciones}
                                            component={AsyncSelectField}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="grado">Grado</label>
                                        <Field
                                            name="grado"
                                            loadOptions={obtenerGrados}
                                            component={AsyncSelectField}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="ciclo">
                                            Ciclo escolar
                                        </label>
                                        <Field
                                            name="asignacion_ciclo"
                                            loadOptions={obtenerCiclos}
                                            component={AsyncSelectField}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <label>Descripción</label>
                                        <Field
                                            name="descripcion"
                                            component={renderField}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end mt-4">
                                <div className="col-3">
                                    <Link
                                        to="/asignacion/listar"
                                        className="btn btn-secondary mr-2"
                                    >
                                        Cancelar
                                    </Link>
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Asignar
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
export default reduxForm({
    form: "asignacionForm",
    validate: (data) => {
        return validate(data, {
            maestro: validators.exists()("Este campo es requerido"),
            curso: validators.exists()("Este campo es requerido"),
            seccion: validators.exists()("Este campo es requerido"),
            grado: validators.exists()("Este campo es requerido"),
            ciclo: validators.exists()("Este campo es requerido"),
        });
    },
})(AsignacionForm);
