import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/maestro/maestro';
import MaestroCrear from './MaestroCrear';


const ms2p = (state) => {
  return {
    ...state.registro,
    ...state.maestro,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaestroCrear);