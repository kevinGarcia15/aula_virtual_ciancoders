import React, { Component } from 'react'
import PortadaContainer from '../asignacion/PortadaContainer'
import TareaListarContainer from '../tarea/TareaListarContainer'


export class Gestion extends Component {
    render() {
        const {match} = this.props
        const id_asignacion = match.params.id
        return (
            <React.Fragment>
                <PortadaContainer id={parseInt(id_asignacion)} />
                <div className="col-lg-6 col-12 card mt-3">
                            <TareaListarContainer
                                id_asignacion={parseInt(id_asignacion)}
                            />
                </div>
            </React.Fragment>
        )
    }
}

export default Gestion
