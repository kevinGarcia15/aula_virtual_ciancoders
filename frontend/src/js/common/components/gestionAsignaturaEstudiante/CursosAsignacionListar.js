import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class CursosAsignacionListar extends Component {
    componentDidMount() {
        const { misCursos } = this.props;
        misCursos();
    }
    render() {
        const { cursosAsignados, loader } = this.props;
        return (
            <React.Fragment>
                <h4>Mis cursos asignados</h4>
                <Grid
                    hover
                    striped
                    data={cursosAsignados}
                    loading={loader}
                    pagination={false}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="curso" dataSort>
                        Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="grado" dataSort>
                        Grado
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="maestro"
                        dataSort
                        dataFormat={(cell) => {
                            return `${cell.maestro_profile.user.first_name} ${cell.maestro_profile.user.last_name}`;
                        }}
                    >
                        Catedratico
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            ver: "/asignacion",
                        })}
                    >
                        Ver asignación
                    </TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default CursosAsignacionListar;
