import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/curso/curso';
import CursoListar from './CursoListar';

const ms2p = (state) => {
  return {
    ...state.curso,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CursoListar);