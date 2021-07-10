import { useState, useEffect, memo } from 'react';

const POPUP_ANIMATION_DURATION = 300;

const defaults = {
  className: 'popup',
  classNameClosed: '',
  isOpened: false,
};
defaults.classNameOpened = `${defaults.className}_opened`;

const Popup = memo(props => {
  const [classNameForAnimation, setClassNameForAnimation] = useState(defaults.classNameClosed);
  const [shouldAppearInDOM, setShouldAppearInDOM] = useState(defaults.isOpened);

  useEffect(() => {
    if (!props.isOpen) {
      document.activeElement.blur(); // fixes mobile keyboard being stuck on the screen after form submission (due to `event.preventDefault()`)
    }

    if (props.isOpen) {
      setShouldAppearInDOM(!defaults.isOpened);
      const showingTimout = setTimeout(() => {
        setClassNameForAnimation(defaults.classNameOpened);
      }, 10);

      return () => clearTimeout(showingTimout);
    } else {
      setClassNameForAnimation(defaults.classNameClosed);
      const hidingTimeout = setTimeout(() => {
        setShouldAppearInDOM(defaults.isOpened);
      }, POPUP_ANIMATION_DURATION);

      return () => clearTimeout(hidingTimeout);
    }
  }, [props.isOpen]);

  if (!shouldAppearInDOM) {
    return null;
  }

  const classNames = [defaults.className, props.className, classNameForAnimation].filter(
    el => el != null && el !== ''
  );

  const className = classNames.join(' ');

  return (
    <section onClick={props.onClick} className={className} id={props.id}>
      {props.children}
    </section>
  );
});

export default Popup;
