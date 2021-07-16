import { memo, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { paths } from '../utils/constants';

import { parseFixedLocalBase64Value } from '../hooks/useStateWithBase64';

import Login from './Login';
import Register from './Register';

const Authentication = memo((props) => {
  const states = {
    email: useState(parseFixedLocalBase64Value('email') ?? ''),
    password: useState(''),
  };

  return props.loggedIn ? (
    <Redirect to={paths.main} />
  ) : (
    <>
      <Route path={paths.login}>
        <Login handleSubmit={props.handleLogin} states={states} />
      </Route>
      <Route path={paths.register}>
        <Register handleSubmit={props.handleRegister} states={states} />
      </Route>
    </>
  );
});

export default Authentication;
