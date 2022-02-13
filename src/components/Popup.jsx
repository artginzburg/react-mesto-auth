import { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';

import { classNames } from '../utils/toClassNames';
import { modalRoot } from '../utils/constants';

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
      const showingTimeout = setTimeout(() => {
        setClassNameForAnimation(defaults.classNameOpened);
      }, 5); // TODO remove this 5ms delay. This is a temporary fix so that Safari displays a transition between .popup and .popup_opened. Chrome, btw, just ignores the transition. Maybe I should rewrite this to a CSS-only solution.
      return () => clearTimeout(showingTimeout);
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
