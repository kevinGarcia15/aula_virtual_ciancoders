import React, { Component } from "react";
import { Link } from "react-router-dom";

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
                                    <Link key={item.id} to={`asignacion/gestion/${item.id}`}>
                                      <li
                                          className="list-group-item"
                                          
                                      >
                                          {`${item.curso}, Grado: ${item.grado}, ${item.seccion}`}
                                      </li>                                    
                                    </Link>
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
                                <Link key={item.id_asignacion} to={`/asignacion/gestion/${item.id_asignacion}`}>
                                  <p
                                      className="m-0 text-sm-left"
                                  >
                                      {`${item.curso}: ${item.pendiente}`}
                                  </p>                                
                                </Link>
                              ))
                            : null}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CursosAsignados;
