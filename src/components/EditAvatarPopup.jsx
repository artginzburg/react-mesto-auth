import { memo, useRef } from 'react';

import {
  useCurrentUser,
  useCurrentUserDispatcher,
  sendApiUpdate,
} from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';
import FormInput from './FormInput';

const EditAvatarPopup = memo((props) => {
  const ref = useRef();

  const currentUser = useCurrentUser();
  const setCurrentUser = useCurrentUserDispatcher();

  function handleSubmit() {
    return sendApiUpdate(
      setCurrentUser,
      currentUser,
      {
        avatar: ref.current.value,
      },
      'updateAvatar'
    ).then((res) => {
      props.onUpdateAvatar();
      return res;
    });
  }

  return (
    <PopupWithForm {...props} onSubmit={handleSubmit} title="Обновить аватар" name="avatar-editor">
      <FormInput
        isFocused={props.isOpen}
        ref={ref}
        type="url"
        name="avatar"
        id="profile-avatar"
        placeholder="Ссылка на картинку"
      />
    </PopupWithForm>
  );
});

export default EditAvatarPopup;
