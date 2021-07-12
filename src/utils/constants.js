export const apiDomain = 'nomoreparties.co';

export const paths = {
  login: process.env.PUBLIC_URL + '/login',
  register: process.env.PUBLIC_URL + '/register',
  main: process.env.PUBLIC_URL + '/',
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
