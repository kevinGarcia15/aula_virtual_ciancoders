import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class CursoListar extends Component {
    componentDidMount() {
        const { listar } = this.props;
        listar()
    }

    render() {
        const { data, loader, eliminar } = this.props;
        return (
            <React.Fragment>
                <Link
                    to="/curso/crear"
                    className="btn btn-primary mt-4 mb-4"
                >
                    Nuevo Curso
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
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "curso",
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

export default CursoListar;
