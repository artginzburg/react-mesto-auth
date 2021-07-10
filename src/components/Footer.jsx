import { memo } from 'react';

import { author } from '../../package.json';

const Footer = memo(() => (
  <footer className="footer">
    <a
      target="_blank"
      rel="noreferrer"
      href="https://github.com/artginzburg"
      className="footer__copyright"
    >
      &copy; 2021 {author}
    </a>
  </footer>
));

export default Footer;
