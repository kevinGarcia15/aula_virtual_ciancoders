import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import { Link } from "react-router-dom";

class CicloListar extends Component {
    componentDidMount() {
        const { listarCiclo } = this.props;
        listarCiclo();
    }
    render() {
        const { dataCiclo, loader, listarCiclo, eliminar } = this.props;
        return (
            <React.Fragment>
                <Link to="/ciclos/crear" className="btn btn-primary mt-4 mb-4">
                    Nuevo ciclo escolar
                </Link>
                <Grid
                    hover
                    striped
                    data={dataCiclo}
                    loading={loader}
                    onPageChange={listarCiclo}
                >
                    <TableHeaderColumn
                        dataField="anio"
                        dataSort
                        isKey
                    ></TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "ciclos",
                            eliminar: eliminar,
                        })}
                    ></TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CicloListar;
