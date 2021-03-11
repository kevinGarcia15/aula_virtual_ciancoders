import Gestion from './Gestion'
import {actions} from '../../../redux/modules/curso/curso'
import {connect} from 'react-redux'

const ms2p = (state)=>{
    return{
        ...state.gestionCursoEstudiante
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(Gestion)
