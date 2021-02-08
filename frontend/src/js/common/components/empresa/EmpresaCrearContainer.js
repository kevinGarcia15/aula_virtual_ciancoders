import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/empresa/empresa';
import EmpresaCrear from './EmpresaCrear';

/**Este elemento representa el estado */
const ms2p = (state) => {
  return {
    ...state.empresa,
  };
};
/**Este representa las acciones */
const md2p = { ...actions };

export default connect(ms2p, md2p)(EmpresaCrear);
