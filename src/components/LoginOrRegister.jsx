import { memo } from 'react';

import { formClassesConfig } from '../utils/utils';

import Form from './Form';
import FormInput from './FormInput';
import InfoTooltip from './InfoTooltip';

const propsForInputs = {
  autoCorrect: 'off',
  spellCheck: false,
  className: `${formClassesConfig.inputClass}_theme_dark`,
};

const LoginOrRegister = memo((props) => {
  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">{props.title}</h2>

      <Form onSubmit={props.onSubmit} className={formClassesConfig.formClass}>
        <FormInput
          {...propsForInputs}
          autoFocus
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
        />
        <FormInput
          {...propsForInputs}
          id={props.passwordAutocomplete}
          name="password"
          type="password"
          placeholder="Пароль"
          autoComplete={props.passwordAutocomplete}
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className={`auth__button ${formClassesConfig.submitButtonClass} ${formClassesConfig.submitButtonClass}_theme_dark`}
        >
          {props.buttonTitle}
        </button>
      </Form>
      {props.children}
      <InfoTooltip
        isOpenState={props.states.isPopupOpen}
        isSuccessState={props.states.isPopupSuccess}
      />
    </div>
  );
});

export default LoginOrRegister;
