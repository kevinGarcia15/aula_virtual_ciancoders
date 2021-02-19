import React, { Component } from 'react'
import EventoListarContainer from '../../evento/eventoListarContainer'

export class DashboardEstudiante extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8 ">
                        <EventoListarContainer/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardEstudiante
