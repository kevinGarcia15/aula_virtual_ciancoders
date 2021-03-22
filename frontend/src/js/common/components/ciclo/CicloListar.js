import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import {Link} from "react-router-dom"

export class CicloListar extends Component {
    componentDidMount() {
        const { listar } = this.props;
        listar();
    }
    render() {
        const { data, loader, listar, eliminar } = this.props;
        return (
            <React.Fragment>
                <Link to="/ciclos/crear" className="btn btn-primary mt-4 mb-4">
                    Nuevo ciclo escolar
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="anio" dataSort>
                        Anio del ciclo escolar
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "ciclos",
                            eliminar: eliminar,
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CicloListar;
