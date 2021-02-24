import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/evento/evento';
import EventoEditar from './eventoEditar';


const ms2p = (state) => {
  return {
    ...state.evento,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(EventoEditar);