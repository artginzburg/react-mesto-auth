import { memo } from 'react';

import { author, homepage } from '../../package.json';

const linkSeparator = '/';

const homepageSplitted = homepage.split(linkSeparator);
homepageSplitted.pop();

const copyrightLink = homepageSplitted.join(linkSeparator);

const Footer = memo(() => (
  <footer className="footer">
    <a target="_blank" rel="noreferrer" href={copyrightLink} className="footer__copyright">
      &copy; 2021 {author}
    </a>
  </footer>
));

export default Footer;
