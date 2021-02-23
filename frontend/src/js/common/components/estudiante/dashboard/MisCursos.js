import React, { Component } from "react";

export class MisCursos extends Component {
    render() {
        const { cursos } = this.props;
        return (
            <React.Fragment>
                <div className="card col-12 col-lg-3 p-2 m-4">
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
                                          {item.curso}
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
