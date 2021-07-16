import { memo, useCallback } from 'react';

const Form = memo(({ onSubmit, ...props }) => {
  const handleSubmit = useCallback(
    (e) => {
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
    </form>
  );
});

export default Form;
