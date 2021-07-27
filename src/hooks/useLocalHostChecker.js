import { useEffect } from 'react';

const { NODE_ENV, REACT_APP_LOCAL_HOST } = process.env;
const NODE_ENV_IS_DEV = NODE_ENV === 'development';
const isDefaultLocalhost = window.location.host === 'localhost';

export default function useLocalHostChecker() {
  useEffect(() => {
    if (NODE_ENV_IS_DEV && REACT_APP_LOCAL_HOST && isDefaultLocalhost) {
      window.location.host = REACT_APP_LOCAL_HOST;
    }
  }, []);
}
