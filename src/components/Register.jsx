import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';

import auth from '../api/auth';

import LoginOrRegister from './LoginOrRegister';

const defaultProps = {
  passwordAutocomplete: 'new-password',
  title: 'Регистрация',
  buttonTitle: 'Зарегистрироваться',
};

const Register = memo(props => {
  const [email] = props.states.email;
  const [password] = props.states.password;

  function handleSubmit() {
    auth.register(email, password).then(res => {
      if (res.statusCode !== 400) {
        props.history.push('/login');
      }
    });
  }

  return (
    <LoginOrRegister onSubmit={handleSubmit} {...props} {...defaultProps}>
      <div className="auth__signin">
        Уже зарегистрированы?{' '}
        <Link to="/login" className="auth__login-link">
          Войти
        </Link>
      </div>
    </LoginOrRegister>
  );
});

export default withRouter(Register);
