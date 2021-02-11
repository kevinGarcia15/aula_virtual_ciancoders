import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export class MaestroList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log("compnentWillMount");
        const { listar } = this.props;
        listar();
    }
    render() {
        const { data, loader } = this.props;
        return (
            <React.Fragment>
                <div></div>
                <Link to="/empresa/create" className="btn btn-primary">
                    Ingresar Maestro
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="id" dataSort>
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="profesion" dataSort>
                        Profesion
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="maestro_profile" dataSort>
                        Direccion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "empresa",
                            ver: "empresa",
                            eliminar: () => {},
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>{" "}
            </React.Fragment>
        );
    }
}

export default MaestroList;
