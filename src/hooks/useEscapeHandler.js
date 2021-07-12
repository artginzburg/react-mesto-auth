import { useCallback, useEffect } from 'react';

export default function useEscapeHandler(dispatch) {
  const escHandler = useCallback(
    e => {
      if (e.key === 'Escape') {
        dispatch();
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const listenerArgs = ['keydown', escHandler, false];

    document.addEventListener(...listenerArgs);

    return () => document.removeEventListener(...listenerArgs);
  }, [escHandler]);
}
