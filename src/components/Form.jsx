import { memo, useCallback } from 'react';

const Form = memo(props => {
  const { onSubmit, ...finalProps } = props;

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
    <form action="#" onSubmit={handleSubmit} {...finalProps}>
      {props.children}
    </form>
  );
});

export default Form;
