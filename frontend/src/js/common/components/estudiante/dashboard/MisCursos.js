import React, { Component } from "react";

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
                                      <li
                                          className="list-group-item"
                                          key={item.id}
                                      >
                                         <div>
                                        {item.curso}
                                        {` (Catedratico: ${item.maestro.maestro_profile.user.first_name} ${item.maestro.maestro_profile.user.last_name})`}
                                        </div>
                                      </li>
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
