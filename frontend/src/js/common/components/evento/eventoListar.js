import React, { Component } from "react";

export class EventoListar extends Component {
    componentDidMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { data } = this.props;
        let hoy = new Date()
        return (
            <React.Fragment>
                <div className="bg-info text-white text-center rounded p-3">
                {new Intl.DateTimeFormat("es-GB", {
                                              month: "long",
                                              day: "2-digit",
                                              year: "numeric",
                                          }).format(
                                              new Date(
                                                hoy
                                              )
                                          )}
                </div>
                    {data
                        ? data.results.map((item) => (
                            <div className="card mt-2 mb-2 ml-5 mr-5 p-3">
                              <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-column">
                                      <h5>{item.titulo}</h5>
                                      <p>
                                          {" "}
                                          {new Intl.DateTimeFormat("es-GB", {
                                              month: "long",
                                              day: "2-digit",
                                          }).format(
                                              new Date(
                                                  item.fecha
                                              )
                                          )}
                                      </p>
                                  </div>
                                  <h6>{item.descripcion}</h6>
                              </div>
                            </div>
                          ))
                        : "No hay eventos"}
            </React.Fragment>
        );
    }
}

export default EventoListar;
