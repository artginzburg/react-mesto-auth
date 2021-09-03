import { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

import { classNames } from '../utils/toClassNames';

const modalRoot = document.getElementById('modal-root');

const defaults = {
  className: 'popup',
  shouldAppearInDOM: false,
};
defaults.classNameOpened = `${defaults.className}_opened`;

const Popup = memo(({ isOpen, closeTimeoutMS = 250, ...props }) => {
  const [classNameForAnimation, setClassNameForAnimation] = useState();
  const [shouldAppearInDOM, setShouldAppearInDOM] = useState(defaults.shouldAppearInDOM);

  useEffect(() => {
    if (isOpen) {
      setShouldAppearInDOM(!defaults.shouldAppearInDOM);
      setClassNameForAnimation(defaults.classNameOpened);
      return;
    }
    document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)

    setClassNameForAnimation();
    const hidingTimeout = setTimeout(() => {
      setShouldAppearInDOM(defaults.shouldAppearInDOM);
    }, closeTimeoutMS);

    return () => clearTimeout(hidingTimeout);
  }, [closeTimeoutMS, isOpen]);

  if (!shouldAppearInDOM) {
    return null;
  }

  return createPortal(
    <section
      style={{ transitionDuration: `${closeTimeoutMS}ms` }}
      {...classNames([defaults.className, props.className, classNameForAnimation])}
      onClick={props.onClick}
      id={props.id}
    >
      {props.children}
    </section>,
    modalRoot,
  );
});

export default Popup;
