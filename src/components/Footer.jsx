import { memo } from 'react';

import { author, repository } from '../../package.json';

const linkSeparator = '/';

const homepageSplitted = repository.url.split(linkSeparator);
homepageSplitted.pop();

const copyrightLink = homepageSplitted.join(linkSeparator).split('+')[1];

const Footer = memo(() => (
  <footer className="footer">
    <a target="_blank" rel="noreferrer" href={copyrightLink} className="footer__copyright">
      &copy; 2021 {author}
    </a>
  </footer>
));

export default Footer;
