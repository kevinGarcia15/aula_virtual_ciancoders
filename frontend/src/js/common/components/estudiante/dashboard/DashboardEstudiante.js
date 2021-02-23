import React, { Component } from 'react'
import EventoListarContainer from '../../evento/eventoListarContainer'
import MisCursos from './MisCursos'
import Tareas from './Tareas'

export class DashboardEstudiante extends Component {
    componentDidMount(){
        const {misCursos,tareasPendientes} = this.props
        misCursos()
        tareasPendientes()
    }
    render() {
        const {cursosAsignados, tareasEntregar}=this.props
        console.log(this.props)
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-8 mt-4">
                        <EventoListarContainer/>
                    </div>
                    <MisCursos cursos={cursosAsignados.estudiante}/>
                    <Tareas tareas={tareasEntregar.tareas_entregar}/>
                </div>
            </div>
        )
    }
}

export default DashboardEstudiante
