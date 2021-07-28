import { memo } from 'react';

import {
  useCurrentUser,
  useCurrentUserDispatcher,
  sendApiUpdate,
} from '../contexts/CurrentUserContext';

import useValidatedForm from '../hooks/useValidatedForm';

import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

const EditProfilePopup = memo((props) => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserDispatcher();

  const { name, about } = currentUser;

  const form = useValidatedForm({
    name,
    about,
  });

  async function handleSubmit() {
    const res = await sendApiUpdate(setCurrentUser, currentUser, form.getData(), 'editProfile');
    props.onUpdateUser();
    return res;
  }

  return (
    <PopupWithForm
      {...props}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="profile-editor"
      isSubmitDisabled={!form.isValid}
    >
      <FormInput
        isFocused={props.isOpen}
        {...form.register('name')}
        autoComplete="name"
        autoCapitalize="words"
        id="profile-name"
        placeholder="Имя"
        maxLength="40"
      />

      <FormInput
        {...form.register('about')}
        id="profile-about"
        placeholder="О себе"
        maxLength="200"
      />
    </PopupWithForm>
  );
});

export default EditProfilePopup;
