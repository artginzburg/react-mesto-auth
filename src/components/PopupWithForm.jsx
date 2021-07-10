import { memo, useCallback, useEffect } from 'react';

import { popupSelectors } from '../utils/utils';
import enableValidation from '../utils/enableValidation';

import Popup from './Popup';

const defaultButtonTitle = 'Сохранить';

const PopupWithForm = memo(props => {
  const { onSubmit, children } = props;

  const handleSubmit = useCallback(
    e => {
      if (onSubmit) {
        e.preventDefault();

        onSubmit(e);
      }

      if (children) {
        e.target.reset();
      }
    },
    [children, onSubmit]
  );

  const popupId = props.name;

  useEffect(() => {
    if (props.isOpen) {
      const validationTimeout = setTimeout(() => {
        enableValidation(popupId);
      }, 1);

      return () => clearTimeout(validationTimeout);
    }
  }, [popupId, props.isOpen]);

  const buttonTitle = props.buttonTitle ?? defaultButtonTitle;

  return (
    <Popup isOpen={props.isOpen} onClick={props.onClose} id={popupId}>
      <div className="popup__container">
        <button type="reset" className={popupSelectors.closeButtonClass} />
        <h2 className="popup__title">{props.title}</h2>

        <form onSubmit={handleSubmit} onReset={props.onReset} className="popup__form" action="#">
          {children}

          <button type="submit" className="popup__button">
            {buttonTitle}
          </button>
        </form>
      </div>
    </Popup>
  );
});

export default PopupWithForm;
