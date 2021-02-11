import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/maestro/maestro';
import MaestroList from './MaestroList';

const ms2p = (state) => {
  return {
    ...state.maestro,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaestroList);