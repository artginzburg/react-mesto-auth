import { memo } from 'react';
import { withRouter } from 'react-router-dom';

import auth from '../api/auth';

const Login = memo(props => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

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

          props.handleLogin();
          props.history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="login">
      <h2 className="login__welcome">Вход</h2>

      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="login__link">
          Войти
        </button>
      </form>
    </div>
  );
});

export default withRouter(Login);
