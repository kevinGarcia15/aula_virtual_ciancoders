import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import AsignacionForm from "./AsignacionForm";
import PortadaContainer from "../asignacion/PortadaContainer";
import TareaListarContainer from "../tarea/TareaListarContainer";
import MaterialListarContainer from "../materialApollo/MaterialListarContainer";

class AsigEstudianteListar extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        const id = match.params.id;
        this.state = {
            id_asignacion: id,
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
    render() {
        const { data, loader, curso, obtenerEstudiantes } = this.props;
        const funcionAsignar = this.asignarEstudiante;
        const eliminar = this.eliminarEstudiante;
        const id_asignacion = this.state.id_asignacion;
        return (
            <React.Fragment>
                <PortadaContainer id={parseInt(id_asignacion)} />
                <div className="container">
                    <div className="row">
                        <div className="col-12 mr-3 card">
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
                        </div>
                        <div className="col-lg-6 col-12 card mt-3">
                            <TareaListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                        <div className="col-lg-1 col-1"></div>
                        <div className="col-lg-5 col-12 card mt-3">
                            <MaterialListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AsigEstudianteListar;
