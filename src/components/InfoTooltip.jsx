import { memo } from 'react';

import checkIcon from '../images/check.svg';
import crossIcon from '../images/cross.svg';

import { popupSelectors } from '../utils/utils';

import Popup from './Popup';
import inPopup from './inPopup';

const backgroundImageUrl = (url) => ({ backgroundImage: `url(${url})` });

const InfoTooltip = memo(({ isSuccess, ...props }) => {
  return (
    <Popup isOpen={props.isOpen} onClick={props.onClose}>
      <div className="popup__container">
        <button type="button" className={popupSelectors.closeButtonClass} />

        <div className="info-tooltip">
          <div
            className="info-tooltip__icon"
            style={backgroundImageUrl(isSuccess ? checkIcon : crossIcon)}
          />
          <h3 className="info-tooltip__title">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </Popup>
  );
});

export default inPopup(InfoTooltip);
