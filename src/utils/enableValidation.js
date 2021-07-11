import FormValidator from './FormValidator';
import { defaultFormConfig } from './utils';

export default function enableValidation(formElement) {
  const profileEditorValidator = new FormValidator(defaultFormConfig, formElement);
  profileEditorValidator.enableValidation();
}
