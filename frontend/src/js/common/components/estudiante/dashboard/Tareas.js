import React, { Component } from "react";

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
                                  <li
                                      className="list-group-item d-flex justify-content-between mt-0 pt-0 pb-0"
                                      key={item.id}
                                  >
                                      <div>
                                          <p className="m-0">{`Curso: ${item.curso}`}</p>
                                          <p>{`Tarea: ${item.titulo}`}</p>
                                      </div>
                                      <p>
                                          {`Fecha entrega:   
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
