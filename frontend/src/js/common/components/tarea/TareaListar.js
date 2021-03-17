import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment";
import "moment-timezone";

class TareaListar extends Component {
    componentDidMount() {
        const { listarTareas, id_asignacion } = this.props;
        listarTareas(id_asignacion);
    }
    eliminar = (id) => {
        const { eliminar, id_asignacion } = this.props;
        eliminar(id, id_asignacion);
    };
    render() {
        const { data, loader, id_asignacion } = this.props;
        const rolUsuario = localStorage.getItem("rol");
        const rol = "Maestro";
        let fechaActual = new Date();
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Tareas</h4>
                {rolUsuario == rol ? (
                    <Link
                        to={`/tarea/${id_asignacion}/crear`}
                        className="btn btn-primary btn-block"
                    >
                        Crear Tarea
                    </Link>
                ) : null}
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    pagination={false}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="titulo" dataSort>
                        Titulo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="fecha_entrega"
                        dataSort
                        dataFormat={(cell, row) => {
                            return (
                                <Moment locale="es-GB" fromNow>
                                    {`${cell} ${row.hora_entrega}`}
                                </Moment>
                            );
                        }}
                    >
                        Entrega
                    </TableHeaderColumn>
                    {rolUsuario == rol ? (
                        <TableHeaderColumn
                            dataField="fecha_entrega"
                            dataSort
                            dataFormat={(cell, row) => {
                                return (
                                    <Link
                                        to={`/tareaestudiante/${row.id}/estudiantes`}
                                        className="d-flex justify-content-center text-success "
                                    >
                                        <span className="material-icons">
                                            assignment_turned_in
                                        </span>
                                    </Link>
                                );
                            }}
                        >
                            Calificar
                        </TableHeaderColumn>
                    ) : (
                        <TableHeaderColumn
                            dataField="fecha_entrega"
                            dataSort
                            dataFormat={(cell, row) => {
                                //Convierte la fecha a un objeto date para ser comparado
                                let fechaConvertida = new Date(
                                    `${cell} ${row.hora_entrega}`
                                );
                                return (
                                    <div>
                                        {fechaActual >= fechaConvertida ? (
                                            <div className="d-flex justify-content-center text-danger">
                                                <span className="material-icons">
                                                    alarm_off
                                                </span>
                                            </div>
                                        ) : (
                                            <Link
                                                to={`/tarea/${id_asignacion}/${row.id}/`}
                                                className="d-flex justify-content-center text-success "
                                            >
                                                <span className="material-icons">
                                                    query_builder
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                );
                            }}
                        >
                            Entregar Tarea
                        </TableHeaderColumn>
                    )}
                    {rolUsuario == rol ? (
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({
                                editar: `/tarea/${id_asignacion}`,
                                ver: `/tarea/${id_asignacion}`,
                                eliminar: this.eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    ) : null}
                </Grid>
            </div>
        );
    }
}

export default TareaListar;
