import CrearEstudianteTarea from './TareaEstudianteCrear'
import {actions} from '../../../redux/modules/tarea_estudiante/tareaEstudiante'
//import {actions as actionsTarea} from '../../../redux/modules/tarea/tarea'
import {connect} from 'react-redux'

const ms2p = (state)=>{
    return{
        ...state.tareaEstudiante
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(CrearEstudianteTarea)