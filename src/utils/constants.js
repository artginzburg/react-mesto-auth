export const apiDomain = 'nomoreparties.co';

const relativePaths = {
  login: '/login',
  register: '/register',
  main: '/',
};

export const paths = {
  login: process.env.PUBLIC_URL + relativePaths.login,
  register: process.env.PUBLIC_URL + relativePaths.register,
  main: process.env.PUBLIC_URL + relativePaths.main,
};

export const appRoutePaths = {
  login: `*${relativePaths.login}`,
  register: `*${relativePaths.register}`,
  main: `*${relativePaths.main}`,
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
