import { memo, useState } from 'react';

import { formClassesConfig } from '../utils/utils';

import Form from './Form';
import FormInput from './FormInput';

const propsForInputs = {
  autoCorrect: 'off',
  spellCheck: false,
  className: `${formClassesConfig.inputClass}_theme_dark`,
};

const inputNames = {
  email: 'email',
  password: 'password',
};

const LoginOrRegister = memo((props) => {
  const [buttonIsSaving, setButtonIsSaving] = useState(false);

  const buttonTitle = buttonIsSaving ? props.buttonSavingTitle : props.buttonTitle;

  const [email, setEmail] = props.states.email;
  const [password, setPassword] = props.states.password;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    setButtonIsSaving(true);

    props.handleSubmit(e, email, password).finally(() => {
      setButtonIsSaving(false);
    });
  }

  function handleReset() {
    setEmail('');
    setPassword('');
  }

  return (
    <div className="content auth">
      <h2 className="auth__title">{props.title}</h2>

      <Form onSubmit={handleSubmit} onReset={handleReset} className={formClassesConfig.formClass}>
        <FormInput
          {...propsForInputs}
          autoFocus
          id={inputNames.email}
          name={inputNames.email}
          type={inputNames.email}
          placeholder="Email"
          autoComplete={inputNames.email}
          value={email}
          onChange={handleEmailChange}
        />
        <FormInput
          {...propsForInputs}
          id={props.passwordAutocomplete}
          name={inputNames.password}
          type={inputNames.password}
          placeholder="Пароль"
          autoComplete={props.passwordAutocomplete}
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          disabled={!email.length || !password.length}
          className={`auth__button ${formClassesConfig.submitButtonClass} ${formClassesConfig.submitButtonClass}_theme_dark`}
        >
          {buttonTitle}
        </button>
      </Form>
      {props.children}
    </div>
  );
});

export default LoginOrRegister;
