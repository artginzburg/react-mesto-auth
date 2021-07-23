import { useCallback, useEffect, useState } from 'react';

import { popupSelectors, formClassesConfig } from '../utils/utils';
import enableValidation from '../utils/enableValidation';
import { defaultFormConfig } from '../utils/utils';

import inPopup from './inPopup';
import Form from './Form';

const defaultButtonTitle = 'Сохранить';
const defaultSavingButtonTitle = 'Сохранение...';

const PopupWithForm = ({ onSubmit, children, onReset, ...props }) => {
  const [buttonIsSaving, setButtonIsSaving] = useState(false);

  const buttonTitle = buttonIsSaving
    ? defaultSavingButtonTitle
    : props.buttonTitle ?? defaultButtonTitle;

  const handleSubmit = useCallback(
    (e) => {
      setButtonIsSaving(true);

      onSubmit &&
        onSubmit(e)
          .then((res) => {
            if (children) {
              e.target.reset();
              onReset && onReset(e);
            }
            return res;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setButtonIsSaving(false);
          });
    },
    [children, onReset, onSubmit]
  );

  const popupId = props.name;

  useEffect(() => {
    // Prevent non-reactive validation from getting destroyed by conditional rendering
    if (props.isOpen) {
      const validationTimeout = setTimeout(() => {
        enableValidation(
          document.getElementById(popupId).querySelector(defaultFormConfig.formSelector)
        );
      }, 1);

      return () => clearTimeout(validationTimeout);
    }
  }, [popupId, props.isOpen]);

  return (
    <div className="popup__container">
      <button type="reset" className={popupSelectors.closeButtonClass} />
      <h2 className="popup__title">{props.title}</h2>

      <Form className={formClassesConfig.formClass} onSubmit={handleSubmit} onReset={onReset}>
        {children}
        <button type="submit" className={`popup__button ${formClassesConfig.submitButtonClass}`}>
          {buttonTitle}
        </button>
      </Form>
    </div>
  );
};

export default inPopup(PopupWithForm, (props) => ({ id: props.name }));
