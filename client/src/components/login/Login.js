import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

const Login = ({firebase}) => {
  console.log(firebase.auth.isEmpty);
  if (firebase.auth.uid) {
    return (
        <button onClick={() => firebase.logout()}
        className="btn btn-primary mb-2">Logout</button>
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

Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);