import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';

import {connectUser} from '../actions/auth';

import {RootState} from '../../../store/rootreducer';
import {LoginView} from '../LoginView';

const mapStateToProps = (_state: RootState) => {
  return {};
};

const mapdispatchToProps = (dispatch: Dispatch) => {
  return {
    ...bindActionCreators(
      {
        connectUser,
      },
      dispatch,
    ),
  };
};

const LoginViewContainer = connect(
  mapStateToProps,
  mapdispatchToProps,
)(LoginView);

export default LoginViewContainer;
