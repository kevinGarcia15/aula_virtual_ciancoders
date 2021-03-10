import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {
    renderField,
    renderNumber,
    renderTextArea,
    renderDayPicker,
    renderTimePicker,
    renderFilePicker,
    renderFieldCheck,
} from ".././Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

class TareaForm extends Component {
    render() {
        let editar = window.location.href.includes("editar");
        let disabled = false;
        const {
            titulo,
            handleSubmit,
            setArchivo,
            id_asignacion,
            infoTarea,
            crear,
        } = this.props;
        crear == false && editar == false
            ? (disabled = true)
            : (disabled = false);
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
                                        <label>Titulo</label>
                                        <Field
                                            name="titulo"
                                            component={renderField}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Descripcion</label>
                                        <Field
                                            name="descripcion"
                                            component={renderTextArea}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Fecha de entrega</label>
                                        <Field
                                            name="fecha_entrega"
                                            component={renderDayPicker}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Hora de entrega</label>
                                        <Field
                                            name="hora_entrega"
                                            component={renderTimePicker}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Nota de la tarea</label>
                                        <Field
                                            decimalScale={2}
                                            name="nota"
                                            placeholder="Nota"
                                            suffix=" puntos"
                                            disabled={disabled}
                                            component={renderNumber}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="avatar">
                                            Archivo adjunto
                                        </label>
                                        <br />
                                        <a
                                            href={infoTarea.archivo}
                                            target="_blank"
                                        >
                                            {infoTarea.archivo}
                                        </a>
                                        <Field
                                            photo={infoTarea.archivo}
                                            name="archivo"
                                            setFile={setArchivo}
                                            disabled={disabled}
                                            component={renderFilePicker}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Field
                                            name="permitir_archivo"
                                            label="Permitir subir archivos"
                                            disabled={disabled}
                                            checkboxStatus={
                                                infoTarea.permitir_archivo
                                            }
                                            component={renderFieldCheck}
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
                                            to={`/asignacion/${id_asignacion}/estudiantes`}
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
                                    <Link
                                        to={`/tareaestudiante/${infoTarea.id}/estudiantes`}
                                        className="btn btn-primary mr-2"
                                    >
                                        Calificar tareas
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
    form: "tareaForm",
    validate: (data) => {
        return validate(data, {
            titulo: validators.exists()("Este campo es requerido"),
            descripcion: validators.exists()("Este campo es requerido"),
            fecha_entrega: validators.exists()("Este campo es requerido"),
            hora_entrega: validators.exists()("Este campo es requerido"),
            nota: validators.exists()("Este campo es requerido"),
        });
    },
})(TareaForm);
