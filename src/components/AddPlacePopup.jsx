import { memo } from 'react';

import useValidatedForm from '../hooks/useValidatedForm';

import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

const defaults = {
  title: '',
  link: '',
};

const AddPlacePopup = memo((props) => {
  const form = useValidatedForm(defaults);

  function handleSubmit() {
    return props.onAddPlace(form.getData());
  }

  return (
    <PopupWithForm
      {...props}
      onSubmit={handleSubmit}
      onReset={form.reset}
      title="Новое место"
      name="element-editor"
      buttonTitle="Создать"
      isSubmitDisabled={form.isInvalid}
    >
      <FormInput
        isFocused={props.isOpen}
        {...form.register('title')}
        id="element-title"
        placeholder="Название"
        maxLength="30"
      />

      <FormInput
        {...form.register('link')}
        type="url"
        id="element-link"
        placeholder="Ссылка на картинку"
      />
    </PopupWithForm>
  );
});

export default AddPlacePopup;
