const classToSelector = (className) => `.${className}`;

export const popupSelectors = {
  closeButtonClass: 'popup__close-button',
};

export const formClassesConfig = {
  formClass: 'form',
  inputClass: 'form__input',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
  submitButtonClass: 'form__button',
};

export const defaultFormConfig = {
  formSelector: classToSelector(formClassesConfig.formClass),
  inputSelector: classToSelector(formClassesConfig.inputClass),
  submitButtonSelector: classToSelector(formClassesConfig.submitButtonClass),
  inputErrorClass: formClassesConfig.inputErrorClass,
  errorClass: formClassesConfig.errorClass,
};
