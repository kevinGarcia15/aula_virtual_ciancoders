import CicloCrear from './CicloCrear'
import {actions} from '../../../redux/modules/ciclo/ciclo'
import {connect} from 'react-redux'

const ms2p = (store)=>{
    return{
        ...store.ciclo
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(CicloCrear)