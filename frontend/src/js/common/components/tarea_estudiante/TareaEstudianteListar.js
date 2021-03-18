import React, { Component } from "react";
import { Link } from "react-router-dom";
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment";
import ModalTexto from "./ModalTexto";

class TareaEstudianteListar extends Component {
    state = {
        id_tarea_estudiante: null,
        form: {},
        modalIsOpen: false,
        texto: null,
        nombreEstudianteModal: null,
    };
    componentDidMount() {
        const { listar, match } = this.props;
        const id_tarea = match.params.id_tarea;
        listar(id_tarea);
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };

    handleOpenModal = (texto, estudiante) => {
        this.setState({
            modalIsOpen: true,
            texto: texto,
            nombreEstudianteModal: estudiante,
        });
    };

    handleCloseModal = (e) => {
        this.setState({ modalIsOpen: false });
    };
    envio = (id) => {
        const { actualizarPunteo, match } = this.props;
        let inputPunteo = `punteo${id}`;
        const punteo = this.state.form[inputPunteo];
        const id_tarea = parseInt(match.params.id_tarea);
        const data = {
            id_tarea_estudiante: id,
            id_tarea: id_tarea,
            punteo: punteo,
        };
        if (id && punteo >= 0) {
            actualizarPunteo(data);
        }
    };

    render() {
        const { data, loader, infoTarea } = this.props;
        return (
            <div>
                <ModalTexto
                    onCloseModal={this.handleCloseModal}
                    modalStatus={this.state.modalIsOpen}
                    texto={this.state.texto}
                    estudiante={this.state.nombreEstudianteModal}
                />
                <div className="mt-3">
                    <h5>{infoTarea.titulo}</h5>
                    <p className="m-0">{infoTarea.descripcion}</p>
                    <p className="m-0">
                        Fecha de entrega:{" "}
                        <Moment locale="es-GB" format="DD/MM/YYYY">
                            {infoTarea.fecha_entrega}
                        </Moment>
                    </p>
                    <p>Nota: {infoTarea.nota} puntos</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <h4>Tareas entregadas</h4>
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
                            dataField="estudiante"
                            dataSort
                            dataFormat={(cell, row) => {
                                return `${cell.estudiante_profile.user.first_name} ${cell.estudiante_profile.user.last_name}`;
                            }}
                        >
                            Alumno
                        </TableHeaderColumn>
                        {}
                        <TableHeaderColumn
                            dataField="archivo"
                            dataSort
                            dataFormat={(cell, row) => {
                                return (
                                    <div>
                                        {cell == null ? (
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    this.handleOpenModal(
                                                        row.texto,
                                                        row.estudiante
                                                            .estudiante_profile
                                                            .user.first_name
                                                    )
                                                }
                                            >
                                                Ver texto
                                            </button>
                                        ) : (
                                            <a href={cell} target="_blanck">
                                                {cell}
                                            </a>
                                        )}
                                    </div>
                                );
                            }}
                        >
                            Entregable
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="punteo"
                            dataSort
                            dataFormat={(cell, row) => {
                                return `${cell} pts`;
                            }}
                        >
                            Punteo
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
                            Entegado
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            dataSort
                            dataFormat={(cell, row) => {
                                return (
                                    <form onSubmit={this.handleSubmit}>
                                        <input
                                            type="number"
                                            required
                                            step="any"
                                            min="0"
                                            name={`punteo${cell}`}
                                            onChange={this.handleChange}
                                        />
                                        <button
                                            className="btn btn-primary ml-1"
                                            type="submit"
                                            onClick={() => this.envio(cell)}
                                        >
                                            Puntuar
                                        </button>
                                    </form>
                                );
                            }}
                        >
                            Asignar punteo
                        </TableHeaderColumn>
                    </Grid>
                </div>
                <Link to={`/asignacion/gestion/${infoTarea.asignacion}`}>
                    Atras
                </Link>
            </div>
        );
    }
}

export default TareaEstudianteListar;
