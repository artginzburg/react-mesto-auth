import { useCallback, useEffect, useRef } from 'react';
import useStateWithLocalStorage from './useStateWithLocalStorage';

export default function useStateWithBase64(computed, defaultForComputed) {
  const [initialState, updateState] = useStateWithLocalStorage(computed, defaultForComputed);

  const setState = useCallback(
    value => {
      updateState(btoa(value));
    },
    [updateState]
  );

  const state = useRef(atob(initialState));

  useEffect(() => {
    state.current = atob(initialState);
  });

  return [state.current, setState];
}
