import { memo } from 'react';
import { withRouter } from 'react-router-dom';

import Form from './Form';
import FormInput from './FormInput';

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

      <Form onSubmit={props.onSubmit} className="form">
        <FormInput
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
        <FormInput
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
        <button type="submit" className="auth__button form__button form__button_theme_dark">
          {props.buttonTitle}
        </button>
      </Form>
      {props.children}
    </div>
  );
});

export default withRouter(LoginOrRegister);
