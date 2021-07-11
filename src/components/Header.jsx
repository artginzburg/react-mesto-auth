import { memo } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../images/logo.svg';

import { homepage } from '../../package.json';

const Header = memo(props => {
  let buttonTitle;
  let buttonLink = '/login';
  let loggedIn = false;

  switch (props.location.pathname) {
    case '/login':
      buttonTitle = 'Регистрация';
      buttonLink = '/register';
      break;

    case '/register':
      buttonTitle = 'Войти';
      break;

    default:
      buttonTitle = 'Выйти';
      loggedIn = true;
      break;
  }

  function signOut() {
    delete localStorage.token;
    props.history.push('/login');
  }

  return (
    <header className="header">
      <a target="_self" href={homepage} className="logo header__logo">
        <img className="logo__img" alt="Mesto" src={logo} />
      </a>
      <div className="header__container">
        {loggedIn && props.credential ? (
          <p className="header__credential">{props.credential}</p>
        ) : null}
        <Link
          to={buttonLink}
          onClick={loggedIn ? signOut : null}
          className={`header__action-button${loggedIn ? ' header__action-button_dimmed' : ''}`}
        >
          {buttonTitle}
        </Link>
      </div>
    </header>
  );
});

export default withRouter(Header);
