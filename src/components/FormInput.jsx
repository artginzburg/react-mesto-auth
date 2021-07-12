import { forwardRef, createRef, useEffect } from 'react';

const defaults = {
  type: 'text',
  required: true,
  minLength: 2,
};

const PopupInput = forwardRef((props, forwardedRef) => {
  const ref = forwardedRef ?? createRef();

  const type = props.type ?? defaults.type;

  const required = props.required ?? defaults.required;

  const conditionalMinLength = type === defaults.type ? defaults.minLength : null;
  const minLength = props.minLength ?? conditionalMinLength;

  const finalProps = {
    type,
    minLength,
    required,
    ref,
  };

  const { isFocused, ...inputProps } = props;

  useEffect(() => {
    if (
      isFocused &&
      ref &&
      ref.current &&
      ref.current.parentElement !== document.activeElement.parentElement
    ) {
      setTimeout(() => {
        ref && ref.current && ref.current.focus();
      }, 50);
    }
  }, [isFocused, ref]);

  return (
    <>
      <input
        {...inputProps}
        className={`form__input${inputProps.className ? ` ${inputProps.className}` : ''}`}
        {...finalProps}
      />
      <p className="form__error" id={`${props.id}-error`} />
    </>
  );
});

export default PopupInput;
