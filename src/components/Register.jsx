import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';

import auth from '../api/auth';

const Register = memo(props => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    auth.register(email, password).then(res => {
      if (res.statusCode !== 400) {
        props.history.push('/login');
      }
    });
  };

  return (
    <div className="register">
      <h2 className="register__welcome">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Зарегистрироваться
          </button>
        </div>
      </form>

      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/login" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
});

export default withRouter(Register);
