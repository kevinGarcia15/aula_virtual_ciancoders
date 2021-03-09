import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment";

class TareaEstudianteListar extends Component {
    componentDidMount() {
        const { listar, match } = this.props;
        const id_tarea = match.params.id_tarea;
        listar(id_tarea);
    }
    render() {
        const { data, loader } = this.props;
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Tareas entregadas</h4>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="estudiante"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `${cell.estudiante_profile.user.first_name} ${cell.estudiante_profile.user.last_name}`;
                        }}
                    >
                        Alumno
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="archivo"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `<a href=${cell} target="_blanck">${cell}</a>`;
                        }}
                    >
                        Documento
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="punteo"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `${cell} pts`;
                        }}
                    >
                        Punteo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="creado"
                        dataSort
                        dataFormat={(cell, row) => {
                            return (
                                <Moment locale="es-GB" fromNow>
                                    {cell}
                                </Moment>
                            );
                        }}
                    >
                        Entegado
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "/tarea/",
                            ver: "/tarea/",
                            eliminar: this.eliminar,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default TareaEstudianteListar;
