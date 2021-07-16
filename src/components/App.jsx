import React from 'react';

import { Route, Switch, useHistory } from 'react-router-dom';

import { paths } from '../utils/constants';

import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';
import useStateWithBase64 from '../hooks/useStateWithBase64';
import useEscapeHandler from '../hooks/useEscapeHandler';

import api from '../api/api';
import auth from '../api/auth';

import { useCurrentUser } from '../contexts/CurrentUserContext';

import Authentication from './Authentication';
import ProtectedRoute from './ProtectedRoute';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';

function App() {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const [loggedIn, setLoggedIn] = React.useState(!!localStorage.token);
  const [email, setEmail] = useStateWithBase64('email', '');

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = useStateWithLocalStorage('cards', []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(setCards)
      .catch((err) => console.log('Couldnt get initial cards from the server', err));
  }, [setCards]);

  async function handleCardLike(card) {
    const oldCards = cards;

    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    const expectedCardLikes = isLiked
      ? card.likes.filter((like) => like._id !== currentUser._id)
      : [...card.likes, currentUser];

    const expectedCard = { ...card, likes: expectedCardLikes };

    setCards(cards.map((c) => (c._id === card._id ? expectedCard : c)));

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards(cards.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      setCards(oldCards);
      console.error(error);
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  const handleCardDelete = React.useCallback(
    (card) => {
      const oldCards = cards;

      setCards(cards.filter((c) => c._id !== card._id));

      api.deleteCard(card._id).catch((error) => {
        setCards(oldCards);
        throw error;
      });

      closeAllPopups();
    },
    [cards, setCards]
  );

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeleteClick(card) {
    setSelectedCard(card);

    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);

    setIsImagePopupOpen(true);
  }

  const handlePopupClick = React.useCallback((e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }, []);

  const handleUpdateUser = closeAllPopups;
  const handleUpdateAvatar = closeAllPopups;

  function handleAddPlaceSubmit(title, link) {
    const oldCards = cards;

    const expectedCard = {
      isTemporarilyLocal: true,
      name: title,
      link,
    };

    setCards([expectedCard, ...cards]);

    api
      .addCard(title, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch(() => setCards(oldCards));

    closeAllPopups();
  }

  useEscapeHandler(closeAllPopups);

  const handleLogin = React.useCallback(
    (email) => {
      setEmail(email);
      setLoggedIn(true);
    },
    [setEmail]
  );

  const handleTokenCheck = React.useCallback(() => {
    if (localStorage.token) {
      auth.token = localStorage.token;
      auth
        .getUserInfo()
        .then((res) => {
          if (res) {
            handleLogin(res.email);
            history.replace(paths.main);
          }
        })
        .catch((err) => {
          setLoggedIn(false);

          console.log(err);
        });
    }
  }, [handleLogin, history]);

  React.useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  return (
    <>
      <Header credential={email} />
      <Switch>
        <Route path={[paths.register, paths.login]}>
          <Authentication handleLogin={handleLogin} />
        </Route>
        <ProtectedRoute path={paths.main} loggedIn={loggedIn}>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmDeleteClick}
          />

          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={handlePopupClick}
          />

          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={handlePopupClick}
          />

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={handlePopupClick}
          />

          <ConfirmDeletePopup
            card={selectedCard}
            onCardDelete={handleCardDelete}
            isOpen={isConfirmDeletePopupOpen}
            onClose={handlePopupClick}
          />

          <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={handlePopupClick} />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
