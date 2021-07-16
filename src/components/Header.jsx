import { memo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { paths, pathNames } from '../utils/constants';
import { repo } from '../utils/pkg';

import logo from '../images/logo.svg';

const Header = memo((props) => {
  const history = useHistory();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = props.loggedIn;

  let buttonTitle;
  let buttonLink = paths.login;

  switch (location.pathname) {
    case paths.login:
      buttonTitle = pathNames.register.title;
      buttonLink = paths.register;
      break;

    case paths.register:
      buttonTitle = pathNames.login.action;
      break;

    default:
      buttonTitle = pathNames.quit.action;
      break;
  }

  function signOut() {
    delete localStorage.token;
    setLoggedIn(false);
    history.replace(paths.login);
  }

  return (
    <header className="header">
      <a target="_self" href={repo} className="logo header__logo">
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

export default Header;
