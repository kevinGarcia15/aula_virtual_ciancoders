import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class GradoListar extends Component {
    componentDidMount() {
        const { listarGrados } = this.props;
        listarGrados()
    }

    render() {
        const { dataGrado, loader, eliminar, listarGrados } = this.props;
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
                    data={dataGrado}
                    loading={loader}
                    onPageChange={listarGrados}
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
