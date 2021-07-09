import { useState, useCallback, useEffect } from 'react';

export default function useStateWithLocalStorage(computed, defaultForComputed) {
  const [currentState, updateCurrentState] = useState(
    localStorage[computed] ? JSON.parse(localStorage[computed]) : defaultForComputed
  );

  const localStorageChanged = useCallback(
    e => {
      if (e.key === computed) {
        updateCurrentState(e.newValue ? JSON.parse(e.newValue) : defaultForComputed);
      }
    },
    [computed, defaultForComputed]
  );

  const setCurrentState = useCallback(
    value => {
      localStorage[computed] = JSON.stringify(value);
      updateCurrentState(value);
    },
    [computed]
  );

  useEffect(() => {
    const listenerArgs = ['storage', localStorageChanged];

    window.addEventListener(...listenerArgs);
    return () => {
      window.removeEventListener(...listenerArgs);
    };
  }, [localStorageChanged]);

  return [currentState, setCurrentState];
}
