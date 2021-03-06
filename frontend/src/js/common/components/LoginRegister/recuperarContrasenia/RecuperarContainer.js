import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/cuenta/profile';
import Recuperar from './Recuperar';


const ms2p = (state) => {
  return {
    ...state.profile,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Recuperar);
