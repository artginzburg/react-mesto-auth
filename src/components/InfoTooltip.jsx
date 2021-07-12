import { memo, useCallback } from 'react';

import checkIcon from '../images/check.svg';
import crossIcon from '../images/cross.svg';

import { popupSelectors } from '../utils/utils';

import Popup from './Popup';

const InfoTooltip = memo(props => {
  const [isOpen, setIsOpen] = props.isOpenState;
  const [isSuccess] = props.isSuccessState;

  const closeItself = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Popup isOpen={isOpen} onClick={closeItself}>
      <div className="popup__container">
        <button type="button" className={popupSelectors.closeButtonClass} />

        <div className="info-tooltip">
          <img alt="Иконка" src={isSuccess ? checkIcon : crossIcon} />
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

export default InfoTooltip;
