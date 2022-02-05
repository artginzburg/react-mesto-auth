import checkIcon from '../images/check.svg';
import crossIcon from '../images/cross.svg';

import { popupSelectors } from '../utils/utils';
import { tooltips } from '../utils/constants';

import inPopup from './inPopup';

const backgroundImageUrl = (url) => ({ backgroundImage: `url(${url})` });

const InfoTooltip = ({ isSuccess }) => (
  <div className="popup__container">
    <button title={tooltips.close} type="button" className={popupSelectors.closeButtonClass} />

    <div className="info-tooltip">
      <div
        className="info-tooltip__icon"
        style={backgroundImageUrl(isSuccess ? checkIcon : crossIcon)}
      />
      <h3 className="info-tooltip__title">
        {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h3>
    </div>
  </div>
);

export default inPopup(InfoTooltip);
