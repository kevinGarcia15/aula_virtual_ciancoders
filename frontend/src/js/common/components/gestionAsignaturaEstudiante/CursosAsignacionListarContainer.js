import GestionListar from './CursosAsignacionListar'
import {connect} from 'react-redux'
import {actions} from '../../../redux/modules/estudiante/RolEstudiante'

const ms2p = (state)=>{
    return{
        ...state.RolEstudiante
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(GestionListar)