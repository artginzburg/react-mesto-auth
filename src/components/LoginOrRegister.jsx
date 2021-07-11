import { memo } from 'react';
import { withRouter } from 'react-router-dom';

import Form from './Form';

const LoginOrRegister = memo(props => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>

      <Form onSubmit={props.onSubmit} className="auth__form">
        <input
          required
          autoFocus
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          autoCorrect="off"
          spellCheck="false"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          required
          id={props.passwordAutocomplete}
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete={props.passwordAutocomplete}
          autoCorrect="off"
          spellCheck="false"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" className="auth__button">
          {props.buttonTitle}
        </button>
      </Form>
      {props.children}
    </div>
  );
});

export default withRouter(LoginOrRegister);
