import AsignacionesMaestrosListar from './AsignacionesMaestrosListar'
//import CustomPaginationTable from './CustomPaginationTable'
import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacionMaestro/asignacion';

const ms2p = (state)=>{
    return{
        ...state.asignacionMaestro
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(AsignacionesMaestrosListar)