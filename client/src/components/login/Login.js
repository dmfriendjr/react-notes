import React from 'react';

const Login = () => {
  return (
    <form className="form-inline">
      <div className="form-group mb-2">
        <label htmlFor="staticEmail2" className="sr-only">Email</label>
        <input type="text" className="form-control" id="staticEmail2" />
      </div>
      <div className="form-group mx-sm-3 mb-2">
        <label htmlFor="inputPassword2" className="sr-only">Password</label>
        <input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
      </div>
      <button type="submit" className="btn btn-primary mb-2">Login</button>
    </form>
  );
};

export default Login;