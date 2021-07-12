import { memo } from 'react';
import { withRouter } from 'react-router-dom';

import { paths, pathNames } from '../utils/constants';

import auth from '../api/auth';

import LoginOrRegister from './LoginOrRegister';

const defaultProps = {
  passwordAutocomplete: 'current-password',
  title: pathNames.login.title,
  buttonTitle: pathNames.login.action,
};

const Login = memo(props => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const setTooltipIsOpen = props.states.isPopupOpen[1];

  function handleSubmit() {
    if (!email || !password) {
      return;
    }

    auth
      .login(email, password)
      .then(data => {
        if (data.token) {
          setEmail('');
          setPassword('');

          localStorage.token = data.token;

          props.handleLogin(email);
          props.history.push(paths.main);
        }
      })
      .catch(err => {
        setTooltipIsOpen(true);
        console.log(err);
      });
  }

  return <LoginOrRegister onSubmit={handleSubmit} {...props} {...defaultProps} />;
});

export default withRouter(Login);
