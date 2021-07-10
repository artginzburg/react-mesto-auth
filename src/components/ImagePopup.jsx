import { memo } from 'react';

import { popupSelectors } from '../utils/utils';

import Popup from './Popup';

const classNames = [
  popupSelectors.closeButtonClass,
  `${popupSelectors.closeButtonClass}_parent-corners_straight`,
];

const className = classNames.join(' ');

const ImagePopup = memo(props => {
  const card = props.card;

  return (
    <Popup
      isOpen={props.isOpen}
      onClick={props.onClose}
      className="popup_type_image"
      id="image-viewer"
    >
      <figure className="popup__figure">
        <button type="button" className={className} />
        <img className="popup__image" alt={card.name} src={card.link} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
});

export default ImagePopup;
