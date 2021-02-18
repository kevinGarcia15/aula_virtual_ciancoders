import React, { Component } from "react";

export class CursosAsignados extends Component {
    render() {
        const { cursos, tareas } = this.props;
        return (
            <React.Fragment>
                <div className="card col-12 col-lg-5 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Cursos Asignados
                        </h6>
                        <ul className="list-group list-group-flush">
                            {cursos
                                ? cursos.map((item) => (
                                      <li
                                          className="list-group-item"
                                          key={item.id}
                                      >
                                          {`${item.curso}, Grado: ${item.grado}, ${item.seccion}`}
                                      </li>
                                  ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="card col-12 col-lg-5 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Tareas pendientes de calificar
                        </h6>
                        <h1 className="card-text text-dark text-center">
                            {tareas.tareasSinCalificar}
                        </h1>
                        {tareas.tareasPorCurso
                            ? tareas.tareasPorCurso.map((item) => (
                                  <p
                                      className="m-0 text-sm-left"
                                      key={item.curso}
                                  >
                                      {`${item.curso}: ${item.pendiente}`}
                                  </p>
                              ))
                            : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CursosAsignados;
