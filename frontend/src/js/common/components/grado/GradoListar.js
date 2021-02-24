import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap'

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class GradoListar extends Component {
    componentDidMount() {
        const { listar } = this.props;
        listar()
    }

    render() {
        const { data, loader, eliminar } = this.props;
        return (
            <React.Fragment>
                <Link
                    to="/grado/crear"
                    className="btn btn-primary mt-4 mb-4"
                >
                    Nuevo Grado
                </Link>
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
                        dataField="nombre"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="descripcion" dataSort>
                        Descripcion
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="nivel" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre;
                        }}>
                        Nivel
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "grado",
                            eliminar: eliminar,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>{" "}
            </React.Fragment>
        );
    }
}

export default GradoListar;
