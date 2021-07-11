import { memo } from 'react';
import { withRouter } from 'react-router-dom';

import auth from '../api/auth';

import LoginOrRegister from './LoginOrRegister';

const defaultProps = {
  passwordAutocomplete: 'current-password',
  title: 'Вход',
  buttonTitle: 'Войти',
};

const Login = memo(props => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

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
          props.history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return <LoginOrRegister onSubmit={handleSubmit} {...props} {...defaultProps} />;
});

export default withRouter(Login);
