import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class SeccionListar extends Component {
    componentDidMount() {
        const { listarSecciones } = this.props;
        listarSecciones()
    }

    render() {
        const { dataSecciones, loader, eliminar, listarSecciones } = this.props;
        return (
            <React.Fragment>
                <Link
                    to="/seccion/crear"
                    className="btn btn-primary mt-4 mb-4"
                >
                    Nueva Seccion
                </Link>
                <Grid
                    hover
                    striped
                    data={dataSecciones}
                    loading={loader}
                    onPageChange={listarSecciones}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="nombre"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "seccion",
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


export default SeccionListar
