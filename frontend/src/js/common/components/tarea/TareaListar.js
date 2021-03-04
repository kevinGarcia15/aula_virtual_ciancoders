import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class TareaListar extends Component {
    componentDidMount() {
        const { listarTareas, id_asignacion } = this.props;
        listarTareas(id_asignacion);
    }
    render() {
        const { data, loader } = this.props;
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Tareas</h4>
                <Link to="" className="btn btn-secondary btn-block">
                    Crear Tarea
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={onPageChange}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="titulo" dataSort>
                        Titulo
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="fecha_entrega" dataSort>
                        Entrega
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "/tarea",
                            ver: "/tarea",
                            eliminar: () => {},
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>{" "}
            </div>
        );
    }
}

export default TareaListar;
