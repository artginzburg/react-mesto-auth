import { memo, useCallback, useEffect } from 'react';

import { popupSelectors } from '../utils/utils';
import enableValidation from '../utils/enableValidation';

import Popup from './Popup';
import Form from './Form';

const PopupWithForm = memo(props => {
  const { onSubmit, children, ...propsWithoutCustom } = props;
  props = propsWithoutCustom;

  const handleSubmit = useCallback(
    e => {
      onSubmit && onSubmit(e);

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

  return (
    <Popup isOpen={props.isOpen} onClick={props.onClose} id={popupId}>
      <div className="popup__container">
        <button type="reset" className={popupSelectors.closeButtonClass} />
        <h2 className="popup__title">{props.title}</h2>

        <Form
          className="popup__form"
          onSubmit={handleSubmit}
          onReset={props.onReset}
          buttonTitle={props.buttonTitle}
        >
          {children}
        </Form>
      </div>
    </Popup>
  );
});

export default PopupWithForm;
