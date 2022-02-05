export const apiDomain = 'nomoreparties.co';

export const paths = {
  login: '/login',
  register: '/register',
  main: '/',
};

export const pathNames = {
  login: {
    title: 'Вход',
    action: 'Войти',
  },
  register: {
    title: 'Регистрация',
    action: 'Зарегистрироваться',
  },
  quit: {
    action: 'Выйти',
  },
};

const keyboard = {
  close: 'Escape',
};

const getButtonPrompt = (key) => `[${key}]`;

export const tooltips = {
  close: getButtonPrompt(keyboard.close),
};
