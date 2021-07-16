import { memo } from 'react';

import { popupSelectors } from '../utils/utils';
import { classNames } from '../utils/toClassNames';

import Popup from './Popup';

const buttonClassNames = [
  popupSelectors.closeButtonClass,
  `${popupSelectors.closeButtonClass}_parent-corners_straight`,
];

const ImagePopup = memo(({ card, ...props }) => (
  <Popup
    isOpen={props.isOpen}
    onClick={props.onClose}
    className="popup_type_image"
    id="image-viewer"
  >
    <figure className="popup__figure">
      <button type="button" {...classNames(buttonClassNames)} />
      <img className="popup__image" alt={card.name} src={card.link} />
      <figcaption className="popup__caption">{card.name}</figcaption>
    </figure>
  </Popup>
));

export default ImagePopup;
