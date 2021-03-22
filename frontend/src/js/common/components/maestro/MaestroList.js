import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export class MaestroList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { listar } = this.props;
        listar();
    }
    render() {
        const { data, loader, eliminar, listar } = this.props;
        return (
            <React.Fragment>
                <Link to="/maestros/crear" className="btn btn-primary btn-lg mt-4 mb-4">
                    Crear Maestro
                </Link>
                <Link to="/asignacion/crear" className="btn btn-success btn-lg mt-4 mb-4 ml-2">
                    Asignar maestro a curso
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    onPageChange={listar}
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
                    <TableHeaderColumn 
                        dataField="profesion" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.nombre;
                        }}
                        >
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

export default MaestroList;
