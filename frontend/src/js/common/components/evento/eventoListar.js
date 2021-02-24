import React, { Component } from "react";
import EventoCrear from "./eventoCrear";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export class EventoListar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        };
    }
    handleOpenModal = (e) => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = (e) => {
        this.setState({ isModalOpen: false });
    };
    componentDidMount() {
        const { listar } = this.props;
        listar();
    }

    render() {
        const { data, crear, eliminar, loader} = this.props;
        let hoy = new Date();
        const rol = localStorage.getItem("rol");
        return (
            <React.Fragment>
                <div className="card-body p-0">
                    <EventoCrear
                        onSubmit={crear}
                        onCloseModal={this.handleCloseModal}
                        modalStatus={this.state.isModalOpen}
                        onUpdate={this.onUpdate}
                    />
                </div>
                <div className="bg-info text-white text-center rounded p-3">
                    {new Intl.DateTimeFormat("es-GB", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                    }).format(new Date(hoy))}
                </div>

                {rol == "Admin" ? (
                    <div>
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={this.handleOpenModal}
                        >
                            Crear Evento
                        </button>
                        <Grid hover striped data={data} loading={loader}>
                            <TableHeaderColumn
                                dataField="titulo"
                                dataSort
                                isKey
                            ></TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="descripcion"
                                dataSort
                            ></TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="fecha"
                                dataSort
                            ></TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="id"
                                dataAlign="center"
                                dataSort
                                dataFormat={standardActions({
                                    editar: "evento",
                                    eliminar: eliminar,
                                })}
                            >
                            </TableHeaderColumn>
                        </Grid>
                    </div>
                ) : (
                    <div>
                        {data.results.length != 0 ? (
                            data.results.map((item) => (
                                <div
                                    key={item.id}
                                    className="card mt-2 mb-2 ml-5 mr-5 p-3"
                                >
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-column">
                                            <h5>{item.titulo}</h5>
                                            <p>
                                                {" "}
                                                {new Intl.DateTimeFormat(
                                                    "es-GB",
                                                    {
                                                        month: "long",
                                                        day: "2-digit",
                                                    }
                                                ).format(new Date(item.fecha))}
                                            </p>
                                        </div>
                                        <h6>{item.descripcion}</h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No hay eventos</div>
                        )}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default EventoListar;
