import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/estudiante/RolEstudiante';
import DashboardEstudiante from './DashboardEstudiante';

const ms2p = (state) => {
  return {
    ...state.RolEstudiante
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardEstudiante);