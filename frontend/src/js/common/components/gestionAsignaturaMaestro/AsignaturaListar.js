import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class AsignaturaListar extends Component {
    componentDidMount() {
        const { cursosAsignados } = this.props;
        cursosAsignados();
    }

    render() {
        const { cursosMaestro, loader,cursosAsignados } = this.props;
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center mt-3">
                    <h4>Mis cursos asignados</h4>
                </div>
                <Grid
                    hover
                    striped
                    data={cursosMaestro}
                    loading={loader}
                    onPageChange={cursosAsignados}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="curso" dataSort>
                        Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="grado" dataSort>
                        Grado
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="seccion" dataSort>
                        Seccion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            ver: "/asignacion/gestion",
                        })}
                    >
                        Ver asignación
                    </TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default AsignaturaListar;
