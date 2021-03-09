import TareaEstudianteListar from './TareaEstudianteListar'
import {connect} from 'react-redux'
import {actions} from '../../../redux/modules/tarea_estudiante/tareaEstudiante'

const ms2p = (state)=>{
    return{
        ...state.tareaEstudiante
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(TareaEstudianteListar)