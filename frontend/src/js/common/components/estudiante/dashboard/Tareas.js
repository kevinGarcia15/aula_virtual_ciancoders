import React, { Component } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

export class Tareas extends Component {
    render() {
        const { tareas } = this.props;
        return (
            <div className="card col-12 col-lg-6 p-2">
                <div className="card-body">
                    <h6 className="card-title text-center text-black">
                        Tareas proximas a entregar
                    </h6>
                    <ul className="list-group list-group-flush">
                        {tareas
                            ? tareas.map((item) => (
                                  <Link
                                      key={item.id_tarea}
                                      to={`/tarea/${item.id_asignacion}/${item.id_tarea}`}
                                  >
                                      <li className="list-group-item d-flex justify-content-between mt-0 pt-0 pb-0">
                                          <div>
                                              <p className="m-0">{`Curso: ${item.curso}`}</p>
                                              <p>{`Tarea: ${item.titulo}`}</p>
                                          </div>
                                          <p>
                                              {`Fecha entrega: `}
                                              <Moment locale="es-GB" fromNow>
                                                  {`${item.fecha_entrega} ${item.hora_entrega}`}
                                              </Moment>
                                          </p>
                                      </li>
                                  </Link>
                              ))
                            : null}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tareas;
