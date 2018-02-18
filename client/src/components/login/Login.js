import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Login = ({firebase, auth}) => {
  if (!auth.isEmpty) {
    return (
      <div>
        <img className="img-thumbnail mr-2" style={{height: '50px'}}  src={auth.photoURL} />
        <span className="align-middle mr-2">{auth.displayName}</span>
        <button onClick={() => firebase.logout()}
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

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// export default firebaseConnect()(Login);
export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Login);