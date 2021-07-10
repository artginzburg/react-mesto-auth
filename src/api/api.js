import Api from '../classes/Api';

const COHORT_ID = 'cohort-24';

const api = {
  url: 'mesto.nomoreparties.co',
  protocol: 'https://',
  version: 'v1',
  endpoints: {
    users: 'users/me',
    cards: 'cards',
  },
};

class Features extends Api {
  getUserInfo() {
    return this._customFetch(api.endpoints.users);
  }

  getInitialCards() {
    return this._customFetch(api.endpoints.cards);
  }

  editProfile = ({ name, about }) =>
    this._customFetch(api.endpoints.users, 'PATCH', {
      name,
      about,
    });

  addCard = (name, link) =>
    this._customFetch(api.endpoints.cards, 'POST', {
      name,
      link,
    });

  deleteCard = cardId => this._customFetch(`${api.endpoints.cards}/${cardId}`, 'DELETE');

  changeLikeCardStatus = (cardId, status) =>
    this._customFetch(`${api.endpoints.cards}/likes/${cardId}`, status ? 'PUT' : 'DELETE');

  updateAvatar = ({ avatar }) =>
    this._customFetch(`${api.endpoints.users}/avatar`, 'PATCH', {
      avatar,
    });
}

export default new Features({
  baseUrl: `${api.protocol}${api.url}/${api.version}/${COHORT_ID}`,
});
