import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { paths, pathNames } from '../utils/constants';

import auth from '../api/auth';

import LoginOrRegister from './LoginOrRegister';

const defaultProps = {
  passwordAutocomplete: 'new-password',
  title: pathNames.register.title,
  buttonTitle: pathNames.register.action,
};

const Register = memo(props => {
  const [email] = props.states.email;
  const [password] = props.states.password;

  function handleSubmit() {
    auth.register(email, password).then(res => {
      if (res.statusCode !== 400) {
        props.history.push(paths.login);
      }
    });
  }

  return (
    <LoginOrRegister onSubmit={handleSubmit} {...props} {...defaultProps}>
      <div className="auth__signin">
        Уже зарегистрированы?{' '}
        <Link to={paths.login} className="auth__login-link">
          {pathNames.login.action}
        </Link>
      </div>
    </LoginOrRegister>
  );
});

export default withRouter(Register);
