import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MisCursos extends Component {
    render() {
        const { cursos } = this.props;
        return (
            <React.Fragment>
                <div className="card col-12 col-lg-5 p-2">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Mis cursos
                        </h6>
                        <ul className="list-group list-group-flush">
                        {cursos
                                ? cursos.map((item) => (
                                    <Link to={`/asignacion/${item.id}`} key={item.id}
                                    >
                                      <li
                                          className="list-group-item"
                                      >
                                         <div>
                                        {item.curso}
                                        {` (Catedratico: ${item.maestro.maestro_profile.user.first_name} ${item.maestro.maestro_profile.user.last_name})`}
                                        </div>
                                      </li>
                                    
                                    </Link>
                                  ))
                                : null}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MisCursos;
