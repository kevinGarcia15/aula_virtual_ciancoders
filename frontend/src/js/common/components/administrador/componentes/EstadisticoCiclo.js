import React, { Component } from "react";

export class EstadisticoCiclo extends Component {
    render() {
        const {
            maestrosAsignados,
            estudiantesAsignados,
            grados,
            secciones,
            ciclo,
        } = this.props.ciclo;

        const {niveles} = this.props
        return (
            <div className="row">
                <div className="card col-12 col-lg-3 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            Ciclo Escolar {ciclo}
                        </h6>
                        <div className="d-flex flex-column">
                            <p className="m-0 text-sm-left text-dark">
                                Maestros asignados: {maestrosAsignados}
                            </p>
                            <p className="m-0 text-sm-left text-dark">
                                Alumnos asignados: {estudiantesAsignados}
                            </p>
                            <p className="m-0 text-sm-left text-dark">
                                Grados: {grados}
                            </p>
                            <p className="m-0 text-sm-left text-dark">
                                Secciones: {secciones}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card col-12 col-lg-3 p-2 m-3">
                    <div className="card-body">
                        <h6 className="card-title text-center">Niveles</h6>
                        <div className="d-flex flex-column">
                            {niveles.map((item) => (
                                <p className="m-0 text-sm-left text-dark" key={item.id}>
                                    {item.nombre}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EstadisticoCiclo;
