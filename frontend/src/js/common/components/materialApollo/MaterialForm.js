import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {reduxForm, Field} from 'redux-form'
import {renderField, renderTextArea, renderFilePicker} from '../Utils/renderField/renderField'
import {validate, validators} from 'validate-redux-form'

class MaterialForm extends Component{
    render(){
        let editar = window.location.href.includes("editar");
        let disabled = false;
        const {
            titulo,
            handleSubmit,
            setArchivo,
            id_asignacion,
            crear,
        } = this.props;
        crear == false && editar == false
            ? (disabled = true)
            : (disabled = false);
        return(
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
                                        {titulo} Material de apollo
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
                                        <label htmlFor="avatar">
                                            Archivo adjunto
                                        </label>
                                        <br />
                                        <a
                                            href=""
                                            target="_blank"
                                        >
                                            Archivo
                                        </a>
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
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        )
    }
}
export default reduxForm({
    form: "materialForm",
    validate: (data) => {
        return validate(data, {
            titulo: validators.exists()("Este campo es requerido"),
            descripcion: validators.exists()("Este campo es requerido"),
            archivo: validators.exists()("Este campo es requerido"),
        });
    },
})(MaterialForm);
