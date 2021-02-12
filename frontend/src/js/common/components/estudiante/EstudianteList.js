import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

export class EstudianteList extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log("compnentWillMount");
        const { listar } = this.props;
        listar();
    }
    render() {
        const { data, loader, eliminar } = this.props;
        return (
            <React.Fragment>
                <Link to="/estudiantes/crear" className="btn btn-primary mt-4 mb-4">
                    Ingresar Estudiante
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
                        isKey dataField="estudiante_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return `${cell.user.first_name}`;
                        }}
                        >
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="estudiante_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.user.email;
                        }}
                    >
                        email
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="estudiante_profile" 
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.phone;
                        }}
                        >
                        telefono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "estudiantes",
                            ver: "estudiantes",
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

export default EstudianteList;