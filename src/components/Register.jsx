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

  const setTooltipIsOpen = props.states.isPopupOpen[1];
  const setTooltipIsSuccess = props.states.isPopupSuccess[1];

  function handleSubmit() {
    auth
      .register(email, password)
      .then(() => {
        props.history.push(paths.login);
        setTooltipIsSuccess(true);
        setTooltipIsOpen(true);
      })
      .catch(err => {
        setTooltipIsSuccess(false);
        setTooltipIsOpen(true);
        console.log(err);
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
