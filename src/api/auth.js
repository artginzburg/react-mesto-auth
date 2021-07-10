import Api from '../classes/Api';
import { apiDomain } from '../utils/constants';

const api = {
  url: new URL(`https://auth.${apiDomain}`),
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
  baseUrl: api.url.origin,
});
