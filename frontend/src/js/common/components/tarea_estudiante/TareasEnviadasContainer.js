import TareasEnviadas from './TareasEnviadas'
import {actions} from '../../../redux/modules/tarea_estudiante/tareaEstudiante'
import {connect} from 'react-redux'

const ms2p = (state) =>{
    return{
        ...state.tareaEstudiante
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(TareasEnviadas)