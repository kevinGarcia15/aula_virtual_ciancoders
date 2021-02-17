import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/administrador/administrador';
import dashboardAdmin from './componentes/dashboardAdmin';

const ms2p = (state) => {
  return {
    ...state.administrador
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(dashboardAdmin);