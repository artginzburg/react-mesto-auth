import { useState, useCallback } from 'react';

import useEventListener from './useEventListener';

export default function useStateWithLocalStorage(computed, defaultForComputed) {
  const [currentState, updateCurrentState] = useState(
    localStorage[computed] && localStorage[computed] !== 'undefined'
      ? JSON.parse(localStorage[computed])
      : defaultForComputed
  );

  const setCurrentState = useCallback(
    (value) => {
      localStorage[computed] = JSON.stringify(value);
      updateCurrentState(value);
    },
    [computed]
  );

  const localStorageChanged = useCallback(
    (e) => {
      if (e.key === computed) {
        updateCurrentState(e.newValue ? JSON.parse(e.newValue) : defaultForComputed);
      }
    },
    [computed, defaultForComputed]
  );

  useEventListener('storage', localStorageChanged);

  return [currentState, setCurrentState];
}
