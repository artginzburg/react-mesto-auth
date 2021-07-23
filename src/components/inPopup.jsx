import { memo } from 'react';

import Popup from './Popup';

const popupShouldRender = (prevProps, nextProps) =>
  !(nextProps.isOpen || prevProps.isOpen !== nextProps.isOpen);

const inPopup = (Component, propsFunction) => {
  const ComponentWrapper = (props) => {
    const popupProps = {
      isOpen: props.isOpen,
      onClick: props.onClose,
      ...(propsFunction && propsFunction(props)),
    };

    return (
      <Popup {...popupProps}>
        <Component {...props} />
      </Popup>
    );
  };

  return memo(ComponentWrapper, popupShouldRender);
};

export default inPopup;
