import { memo, useState } from 'react';
import { withRouter } from 'react-router';

import Login from './Login';
import Register from './Register';

const Authentication = memo(props => {
  const states = {
    email: useState(''),
    password: useState(''),
  };

  const pathIsLogin = props.location.pathname === '/login';

  return pathIsLogin ? (
    <Login handleLogin={props.handleLogin} states={states} />
  ) : (
    <Register states={states} />
  );
});

export default withRouter(Authentication);
