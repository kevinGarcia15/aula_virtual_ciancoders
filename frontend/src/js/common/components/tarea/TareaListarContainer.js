import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tarea/tarea';
import TareaListar from './TareaListar';

const ms2p = (state) => {
  return {
    ...state.tarea,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TareaListar);