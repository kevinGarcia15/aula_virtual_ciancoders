import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/maestro/rolMaestro';
import DashboardMaestro from './dashboardMaestro';

const ms2p = (state) => {
  return {
    ...state.rolMaestro
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboardMaestro);