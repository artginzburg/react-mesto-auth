import FormValidator from './FormValidator';
import { defaultFormConfig } from './utils';

export default function enableValidation(popupId) {
  const popupElement = document.getElementById(popupId);
  const profileEditorValidator = new FormValidator(
    defaultFormConfig,
    popupElement.querySelector(defaultFormConfig.formSelector)
  );
  profileEditorValidator.enableValidation();
}
