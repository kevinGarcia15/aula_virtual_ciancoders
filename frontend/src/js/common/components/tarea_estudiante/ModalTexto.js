import React, { Component } from 'react'

export class ModalTexto extends Component {
    render() {
        const {
            onCloseModal,
            modalStatus,
            texto,
            estudiante
        } = this.props;
        let modalClass = modalStatus ? "modal-container" : "modal modal-container";
        return (
            <div className={modalClass} id="modalText">
                <div className="modal-body-content">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{estudiante}</h4>
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
                                    <div>
                                        {texto}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-primary"
                                    onClick={onCloseModal}
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                </div>
            </div>
            )
    }
}

export default ModalTexto
