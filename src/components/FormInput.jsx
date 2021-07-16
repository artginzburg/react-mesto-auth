import { forwardRef, createRef, useEffect } from 'react';

import { formClassesConfig } from '../utils/utils';
import { classNames } from '../utils/toClassNames';

const defaults = {
  type: 'text',
  required: true,
  minLength: 2,
};

const PopupInput = forwardRef(({ isFocused, ...props }, forwardedRef) => {
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
        {...props}
        {...classNames([formClassesConfig.inputClass, props.className])}
        {...finalProps}
      />
      <p className="form__error" id={`${props.id}-error`} />
    </>
  );
});

export default PopupInput;
