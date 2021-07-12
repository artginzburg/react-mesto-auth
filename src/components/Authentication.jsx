import { memo, useState } from 'react';
import { withRouter } from 'react-router';

import { paths } from '../utils/constants';

import Login from './Login';
import Register from './Register';

const Authentication = memo(props => {
  const states = {
    email: useState(localStorage.email ? atob(JSON.parse(localStorage.email)) : ''),
    password: useState(''),
  };

  const pathIsLogin = props.location.pathname === paths.login;

  return pathIsLogin ? (
    <Login handleLogin={props.handleLogin} states={states} />
  ) : (
    <Register states={states} />
  );
});

export default withRouter(Authentication);
