import React from 'react';

import api from '../utils/api';

const defaultUserState = {
  name: 'Неизвестный',
  about: 'Потеряно соединение с сервером',
};

const CurrentUserContext = React.createContext();
const CurrentUserDispatchContext = React.createContext();

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

export {
  defaultUserState,
  CurrentUserContext,
  CurrentUserDispatchContext,
  useCurrentUserDispatcher,
  sendApiUpdate,
};
