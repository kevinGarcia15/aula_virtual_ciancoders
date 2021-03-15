import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/asignacionEstudiante/asignacion';
import GestionAsignatura from './GestionAsignatura';

const ms2p = (state) => {
  return {
    ...state.asignacionEstudiante,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(GestionAsignatura);