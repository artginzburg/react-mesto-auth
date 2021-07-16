import { memo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { paths } from '../utils/constants';

import Login from './Login';
import Register from './Register';

const Authentication = memo((props) => {
  const location = useLocation();

  const states = {
    email: useState(localStorage.email ? atob(JSON.parse(localStorage.email)) : ''),
    password: useState(''),
    isPopupOpen: useState(false),
    isPopupSuccess: useState(false),
  };

  const pathIsLogin = location.pathname === paths.login;

  return pathIsLogin ? (
    <Login handleLogin={props.handleLogin} states={states} />
  ) : (
    <Register states={states} />
  );
});

export default Authentication;
