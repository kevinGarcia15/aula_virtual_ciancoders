/**Componente que muestra la informacion de la tarea
 * para el usuario tipo Estudiante
 */
import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

export class InformacionTarea extends Component {
    render() {
        const { id_asignacion, infoTarea } = this.props;
        return (
            <div className="card">
                <ul className="list-group">
                    <li className="list-group-item">
                        <h5 className="font-weight-bold">Titulo:</h5>{" "}
                        {infoTarea.titulo}
                    </li>
                    <li className="list-group-item">
                        <h5 className="font-weight-bold">Descripción:</h5>{" "}
                        {infoTarea.descripcion}
                    </li>
                    <li className="list-group-item">
                        <h5 className="font-weight-bold">Fecha de entrega:</h5>{" "}
                        <Moment format="DD/MM/YYYY">
                        {infoTarea.fecha_entrega}
                        </Moment>
                    </li>
                    <li className="list-group-item">
                        <h5 className="font-weight-bold">Hora de entrega:</h5>{" "}
                            {infoTarea.hora_entrega} hrs
                    </li>
                    <li className="list-group-item">
                        <h5 className="font-weight-bold">Punteo:</h5>{" "}
                        {infoTarea.nota}
                    </li>
                    {infoTarea.archivo ? (
                        <li className="list-group-item">
                            <h5 className="font-weight-bold">Archivo adjunto disponible:</h5>{" "}
                            <a
                                href={infoTarea.archivo}
                                className="btn btn-success"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="material-icons">get_app</span>
                            </a>
                        </li>
                    ) : null}
                </ul>
                <div className="d-flex justify-content-end">
                    <Link
                        to={`/asignacion/${id_asignacion}`}
                        className="btn btn-secondary m-2"
                    >
                        Aceptar
                    </Link>
                    <Link
                        to={`/tareaestudiante/${infoTarea.id}/entregar/${id_asignacion}`}
                        className="btn btn-primary m-2 d-flex align-item-center"
                    >
                        Subir tarea
                    </Link>
                </div>
            </div>
        );
    }
}

export default InformacionTarea;
