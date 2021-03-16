import AsignaturaListar from './AsignaturaListar'
import {actions} from '../../../redux/modules/maestro/rolMaestro'
import {connect} from 'react-redux'

const ms2p = (state)=>{
    return{
        ...state.rolMaestro
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(AsignaturaListar)