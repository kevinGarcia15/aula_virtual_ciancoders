import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export class EmpresaList extends Component {
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }
    render() {
        const {data,loader, eliminar} = this.props
        return (
            <React.Fragment>
                <Link to="/empresa/create" className="btn btn-primary">
                    crear empresa
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="lugar" dataSort>
                        Direccion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "empresa",
                            ver: "empresa",
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

export default EmpresaList;
