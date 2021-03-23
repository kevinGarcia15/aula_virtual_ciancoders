import React, { Component } from "react";
import Grid from "../../Utils/Grid";
import { standardActions } from "../../Utils/Grid/StandardActions";
import AsignacionForm from "./AsignacionForm";

class AsigEstudianteListar extends Component {
    constructor(props) {
        super(props);
        const { id_asignacion } = this.props;
        this.state = {
            id_asignacion: id_asignacion,
        };
    }
    componentDidMount() {
        const { listarEstudiantes } = this.props;
        const id = this.state.id_asignacion;
        listarEstudiantes(id);
    }
    asignarEstudiante = (data) => {
        const { asignar } = this.props;
        const id = this.state.id_asignacion;
        asignar(id, data);
    };
    eliminarEstudiante = (id) => {
        const { eliminar } = this.props;
        const id_asignacion = this.state.id_asignacion;
        eliminar(id, id_asignacion);
    };
    handlePaginacion = (pagina) => {
        const { listarEstudiantes } = this.props;
        const id_asignacion = this.state.id_asignacion;
        listarEstudiantes(id_asignacion, pagina);
    };
    render() {
        const { data, loader, curso, obtenerEstudiantes } = this.props;
        const funcionAsignar = this.asignarEstudiante;
        const eliminar = this.eliminarEstudiante;
        const id_asignacion = this.state.id_asignacion;
        return (
            <React.Fragment>
                <div className="d-flex flex-column align-items-center">
                    <h4>Estudiantes</h4>
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
                    onPageChange={this.handlePaginacion}
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
