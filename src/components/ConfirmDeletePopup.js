import { memo } from 'react';

import PopupWithForm from './PopupWithForm';

const ConfirmDeletePopup = memo(props => {
  function handleSubmit() {
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      {...props}
      onSubmit={handleSubmit}
      title="Вы уверены?"
      name="delete-confirmation"
      buttonTitle="Да"
    />
  );
});

export default ConfirmDeletePopup;
