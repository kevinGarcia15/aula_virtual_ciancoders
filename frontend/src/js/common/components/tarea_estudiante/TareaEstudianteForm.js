import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {
    renderTextArea,
    renderFilePicker,
} from ".././Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

class TareaEstudianteForm extends Component {
    render() {
        const disabled = false;
        const { handleSubmit, setArchivo, titulo , id_asignacion} = this.props;
        return (
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <h3 className="text-center"></h3>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">
                                        {titulo} Tarea
                                    </h5>
                                </div>
                                <div className="col-8">
                                    <div className="mb-2">
                                        <label>Texto</label>
                                        <Field
                                            name="descripcion"
                                            component={renderTextArea}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="avatar">
                                            Archivo adjunto
                                        </label>
                                        <Field
                                            name="archivo"
                                            setFile={setArchivo}
                                            disabled={disabled}
                                            component={renderFilePicker}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {disabled == false ? (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-end">
                                    <div className="col-3">
                                        <Link
                                            to={`/asignacion/${id_asignacion}`}
                                            className="btn btn-secondary mr-2"
                                        >
                                            Cancelar
                                        </Link>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-end">
                                    <Link
                                        to={`/asignacion/${id_asignacion}/estudiantes`}
                                        className="btn btn-secondary mr-2"
                                    >
                                        Aceptar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        );
    }
}
export default reduxForm({
    form: "tareaEstudianteForm",
    validate: (data) => {
        return validate(data, {});
    },
})(TareaEstudianteForm);
