import { memo } from 'react';

import { pathNames } from '../utils/constants';

import LoginOrRegister from './LoginOrRegister';

const defaultProps = {
  passwordAutocomplete: 'current-password',
  title: pathNames.login.title,
  buttonTitle: pathNames.login.action,
};

const Login = memo((props) => (
  <LoginOrRegister handleSubmit={props.handleLogin} {...props} {...defaultProps} />
));

export default Login;
