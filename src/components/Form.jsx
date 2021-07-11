import { memo, useCallback } from 'react';

const defaultButtonTitle = 'Сохранить';

const Form = memo(props => {
  const { buttonTitle, onSubmit, ...propsWithoutCustom } = props;
  props = propsWithoutCustom;

  const handleSubmit = useCallback(
    e => {
      if (onSubmit) {
        e.preventDefault();

        onSubmit(e);
      }
    },
    [onSubmit]
  );

  return (
    <form action="#" onSubmit={handleSubmit} {...props}>
      {props.children}

      <button type="submit" className="popup__button">
        {buttonTitle ?? defaultButtonTitle}
      </button>
    </form>
  );
});

export default Form;
