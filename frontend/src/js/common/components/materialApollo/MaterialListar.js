import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class MaterialListar extends Component {
    componentDidMount() {
        const { listarMaterial, id_asignacion } = this.props;
        listarMaterial(id_asignacion);
    }
    /*eliminar = (id)=>{
        const {eliminar, id_asignacion} = this.props
        eliminar(id, id_asignacion)
    }*/
    render() {
        const { data, loader, id_asignacion } = this.props;
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Material de apollo</h4>
                <Link
                    to={`/material/${id_asignacion}/crear`}
                    className="btn btn-primary btn-block"
                >
                    Aniadir material de apollo
                </Link>
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
                            return `<a href=${cell} target="_blank">Documento</a>`;
                        }}
                    >
                        Archivo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: `/material/${id_asignacion}`,
                            ver: `/material/${id_asignacion}`,
                            eliminar: () => {},
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default MaterialListar;
