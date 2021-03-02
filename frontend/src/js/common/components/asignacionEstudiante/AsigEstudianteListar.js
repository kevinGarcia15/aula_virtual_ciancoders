import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import AsignacionForm from "./AsignacionForm";


class AsigEstudianteListar extends Component {
    componentDidMount() {
        const { listarEstudiantes, match } = this.props;
        const id = match.params.id;
        listarEstudiantes(id);
    }
    asignarEstudiante = (data)=>{
        const {asignar, match, listarEstudiantes} = this.props;
        const id = match.params.id
        asignar(id,data)
    }
    eliminarEstudiante = (id)=>{
        const {match, eliminar} = this.props;
        const id_asignacion = match.params.id
        eliminar(id,id_asignacion)
    }
    render() {
        const { data, loader, curso, obtenerEstudiantes } = this.props;
        const funcionAsignar = this.asignarEstudiante;
        const eliminar = this.eliminarEstudiante
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center mt-3">
                    <h2>{curso.curso}</h2>
                    <h5>{`${curso.grado} ${curso.seccion}`}</h5>
                </div>
                <AsignacionForm 
                    onSubmit={funcionAsignar}
                    obtenerEstudiantes={obtenerEstudiantes}
                    />
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
                        dataField="estudiante_profile"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `${cell.user.first_name} ${cell.user.last_name} `;
                        }}
                    >
                        Alumno
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="estudiante_profile"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `${cell.phone}`;
                        }}
                    >
                        Teléfono
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="estudiante_profile"
                        dataSort
                        dataFormat={(cell, row) => {
                            return `${cell.address}`;
                        }}
                    >
                        Dirección
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
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

export default AsigEstudianteListar;
