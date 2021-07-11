import { memo } from 'react';

import logo from '../images/logo.svg';

import { homepage } from '../../package.json';

const Header = memo(() => (
  <header className="header">
    <a target="_self" href={homepage} className="logo header__logo">
      <img className="logo__img" alt="Mesto" src={logo} />
    </a>
  </header>
));

export default Header;
