import React, { Component } from "react";

export class Tareas extends Component {
    render() {
        const { tareas } = this.props;
        return (
            <div className="card col-12 col-lg-8 p-2 mt-3">
                <div className="card-body">
                    <h6 className="card-title text-center">
                        Tareas proximas a entregar
                    </h6>
                    <ul className="list-group list-group-flush">
                        {tareas
                            ? tareas.map((item) => (
                                  <li
                                      className="list-group-item d-flex justify-content-between"
                                      key={item.id}
                                  >
                                      <p>{`Curso: ${item.curso}. Tarea: ${item.titulo}`}</p>
                                      <p>{`Fecha entrega:   
                                          ${new Intl.DateTimeFormat("es-GB", {
                                              month: "long",
                                              day: "2-digit",
                                          }).format(
                                              new Date(item.fecha_entrega)
                                          )}`}
                                      </p>
                                  </li>
                              ))
                            : null}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tareas;
