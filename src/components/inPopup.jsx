import { memo } from 'react';

const popupShouldRender = (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen;

const inPopup = (Component) => memo(Component, popupShouldRender);

export default inPopup;
