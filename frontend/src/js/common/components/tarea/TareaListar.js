import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class TareaListar extends Component {
    componentDidMount() {
        const { listarTareas, id_asignacion } = this.props;
        listarTareas(id_asignacion);
    }
    eliminar = (id)=>{
        const {eliminar, id_asignacion} = this.props
        eliminar(id, id_asignacion)
    }
    render() {
        const { data, loader, id_asignacion} = this.props;
        return (
            <div className="d-flex flex-column align-items-center">
                <h4>Tareas</h4>
                <Link to={`/tarea/${id_asignacion}/crear`} className="btn btn-primary btn-block">
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
                            editar: `/tarea/${id_asignacion}`,
                            ver: `/tarea/${id_asignacion}`,
                            eliminar: this.eliminar,
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
