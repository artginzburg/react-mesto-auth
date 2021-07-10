import { memo, useState } from 'react';

import PopupWithForm from './PopupWithForm';
import PopupInput from './PopupInput';

const defaults = {
  title: '',
  link: '',
};

const AddPlacePopup = memo(props => {
  const [title, setTitle] = useState(defaults.title);
  const [link, setLink] = useState(defaults.link);

  function handleSubmit() {
    props.onAddPlace(title, link);
  }

  function handleReset() {
    setTitle(defaults.title);
    setLink(defaults.link);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      {...props}
      onSubmit={handleSubmit}
      onReset={handleReset}
      title="Новое место"
      name="element-editor"
      buttonTitle="Создать"
    >
      <PopupInput
        isFocused={props.isOpen}
        value={title}
        onChange={handleTitleChange}
        name="title"
        id="element-title"
        placeholder="Название"
        maxLength="30"
      />

      <PopupInput
        value={link}
        onChange={handleLinkChange}
        type="url"
        name="link"
        id="element-link"
        placeholder="Ссылка на картинку"
      />
    </PopupWithForm>
  );
});

export default AddPlacePopup;
