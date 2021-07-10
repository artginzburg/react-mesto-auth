import Api from '../classes/Api';

const api = {
  url: 'auth.nomoreparties.co',
  protocol: 'https://',
  endpoints: {
    signup: 'signup',
    signin: 'signin',
    user: 'users/me',
  },
};

class Auth extends Api {
  register(email, password) {
    return this._customFetch(api.endpoints.signup, 'POST', { password, email });
  }

  login(email, password) {
    return this._customFetch(api.endpoints.signin, 'POST', { password, email });
  }

  getUserInfo() {
    return this._customFetch(api.endpoints.user);
  }
}

export default new Auth({
  baseUrl: `${api.protocol}${api.url}`,
});
