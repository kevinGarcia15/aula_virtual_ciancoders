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
                <Link to="/maestros/crear" className="btn btn-primary mt-4 mb-4">
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
                    <TableHeaderColumn 
                        isKey dataField="maestro_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${cell.user.first_name}`;
                        }}
                        >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="profesion" dataSort>
                        Profesion
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="maestro_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.address;
                        }}
                    >
                        Direccion
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="maestro_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.user.email;
                        }}
                        >
                        Correo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "maestros",
                            ver: "maestros",
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
