import React from 'react';

import api from '../api/api';

import useStateWithLocalStorage from '../hooks/useStateWithLocalStorage';

const defaultUserState = {
  name: 'Неизвестный',
  about: 'Потеряно соединение с сервером',
};

const CurrentUserContext = React.createContext();
const CurrentUserDispatchContext = React.createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useStateWithLocalStorage('currentUser', defaultUserState);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch(err => console.log('Couldnt get user info from the server', err));
  }, [setCurrentUser]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserDispatchContext.Provider value={setCurrentUser}>
        {children}
      </CurrentUserDispatchContext.Provider>
    </CurrentUserContext.Provider>
  );
}

function useCurrentUser() {
  const context = React.useContext(CurrentUserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
}

function useCurrentUserDispatcher() {
  const context = React.useContext(CurrentUserDispatchContext);
  if (context === undefined) {
    throw new Error('useCurrentUserDispatcher must be used within a CurrentUserProvider');
  }
  return context;
}

function objectsAreEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

async function sendApiUpdate(dispatch, user, updates, func) {
  const expectedUser = { ...user, ...updates };
  dispatch(expectedUser);

  try {
    const updatedUser = await api[func](updates);
    if (!objectsAreEqual(expectedUser, updatedUser)) {
      dispatch(updatedUser);
    }
  } catch (error) {
    dispatch(user);
    throw error;
  }
}

export { CurrentUserProvider, useCurrentUser, useCurrentUserDispatcher, sendApiUpdate };
