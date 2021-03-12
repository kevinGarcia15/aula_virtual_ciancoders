import React, { Component } from "react";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment";

class TareasEnviadas extends Component {
    componentDidMount() {
        const { ObtenerMisNotas, id_asignacion } = this.props;
        ObtenerMisNotas(id_asignacion);
    }
    render() {
        const { misNotas, loader } = this.props;

        let zona = 0;
        misNotas.results
            ? misNotas.results.map((item) => {
                  zona = zona + item.punteo;
              })
            : null;

        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Zona acumulada: {zona} puntos</h4>
                <Grid
                    hover
                    striped
                    data={misNotas}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn
                        isKey
                        dataField="tarea"
                        dataSort
                        dataFormat={(cell, row) => {
                            return cell.titulo;
                        }}
                    >
                        Titulo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="creado"
                        dataSort
                        dataFormat={(cell, row) => {
                            return (
                                <Moment locale="es-GB" fromNow>
                                    {cell}
                                </Moment>
                            );
                        }}
                    >
                        Entregado
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="punteo" dataSort>
                        Punteo
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default TareasEnviadas;
