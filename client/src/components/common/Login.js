import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as editorActions from '../../actions/editorActions';
import { firebaseConnect } from 'react-redux-firebase';
import { compose, bindActionCreators } from 'redux';

const Login = ({firebase, auth, actions}) => {
  if (!auth.isEmpty) {
    return (
      <div>
        <img className="img-thumbnail mr-2" style={{height: '50px'}}  src={auth.photoURL} />
        <span className="align-middle mr-2">{auth.displayName}</span>
        <button onClick={() => {firebase.logout(); actions.clearNotesStore(); }}
        className="btn btn-primary mb-2">Logout</button>
      </div>
    );
  }
  else {
    return (
        <button onClick={() =>
          firebase.login({
            provider: 'google',
            type: 'popup',
          })
        }
        className="btn btn-primary mb-2">Login</button>
    );
  }
};

const mapStateToProps = (state) => ({auth: state.firebase.auth});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(editorActions,dispatch)
});

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

// export default firebaseConnect()(Login);
export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);