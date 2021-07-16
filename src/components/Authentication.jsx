import { memo, useState } from 'react';
import { Route } from 'react-router-dom';

import { paths } from '../utils/constants';

import Login from './Login';
import Register from './Register';

const Authentication = memo((props) => {
  const states = {
    email: useState(localStorage.email ? atob(JSON.parse(localStorage.email)) : ''),
    password: useState(''),
    isPopupOpen: useState(false),
    isPopupSuccess: useState(false),
  };

  return (
    <>
      <Route path={paths.login}>
        <Login handleLogin={props.handleLogin} states={states} />
      </Route>
      <Route path={paths.register}>
        <Register states={states} />
      </Route>
    </>
  );
});

export default Authentication;
