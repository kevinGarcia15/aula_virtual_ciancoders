import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { renderFilePicker } from "../Utils/renderField/renderField";
import '../../../../style/portada.css'

class PortadaForm extends Component {
    render() {
        const {
            handleSubmit,
            onCloseModal,
            modalStatus,
            portadaCurso,
            setPortada,
        } = this.props;
        let modalClass = modalStatus ? "modal-container" : "modal modal-container";
        return (
            <div className={modalClass} id="actualizarPortada">
                <div className="modal-body-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Agregar portada</h4>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    onClick={onCloseModal}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group has-feedback flex-1 mx-3">
                                    <label htmlFor="avatar">Portada</label>
                                    <Field
                                        name="portada"
                                        setFile={setPortada}
                                        component={renderFilePicker}
                                        photo={portadaCurso}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                    onClick={onCloseModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={onCloseModal}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default reduxForm({
    form: "asignacionPortadaForm", // a unique identifier for this form
})(PortadaForm);
