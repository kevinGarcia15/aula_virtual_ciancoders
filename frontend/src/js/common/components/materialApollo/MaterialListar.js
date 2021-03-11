import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class MaterialListar extends Component {
    componentDidMount() {
        const { listarMaterial, id_asignacion } = this.props;
        listarMaterial(id_asignacion);
    }
    eliminar = (id) => {
        const { eliminar, id_asignacion } = this.props;
        eliminar(id, id_asignacion);
    };
    render() {
        const { data, loader, id_asignacion } = this.props;
        const rolUsiario = localStorage.getItem("rol");
        const rol = rolUsiario == "Maestro" ? true : false;
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Material de apollo</h4>
                {rol ? (
                    <Link
                        to={`/material/${id_asignacion}/crear`}
                        className="btn btn-primary btn-block"
                    >
                        Aniadir material de apollo
                    </Link>
                ) : null}
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="titulo" dataSort>
                        Titulo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="archivo"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `<a href=${cell} target="_blank">Descargar</a>`;
                        }}
                    >
                        Archivo
                    </TableHeaderColumn>
                    {rol ? (
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={standardActions({
                                editar: `/material/${id_asignacion}`,
                                ver: `/material/${id_asignacion}`,
                                eliminar: this.eliminar,
                            })}
                        >
                            Acciones
                        </TableHeaderColumn>
                    ) : (
                        <TableHeaderColumn
                            dataField="creado"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell) => {
                                return (
                                    <Moment locale="es-GB" fromNow>
                                        {cell}
                                    </Moment>
                                );
                            }}
                        >
                            Subido
                        </TableHeaderColumn>
                    )}
                </Grid>
            </div>
        );
    }
}

export default MaterialListar;
