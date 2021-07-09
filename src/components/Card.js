import { memo, useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

const defaults = {
  cardDeleteButtonClassName: 'element__trash-button',
  cardLikeButtonClassName: 'element__like-button',
};

const Card = memo(props => {
  const { card } = props;

  card.likes = card.likes ?? [];

  const currentUser = useContext(CurrentUserContext);

  if (card.isTemporarilyLocal) {
    card.owner = currentUser;
  }

  const cardDeleteButtonClassNames = [defaults.cardDeleteButtonClassName];

  const isOwn = card.owner._id === currentUser._id;
  if (isOwn) {
    const cardDeleteButtonClassNameAttrubited = `${defaults.cardDeleteButtonClassName}_visible`;
    cardDeleteButtonClassNames.push(cardDeleteButtonClassNameAttrubited);
  }

  const cardDeleteButtonFinalClassName = cardDeleteButtonClassNames.join(' ');

  const cardLikeButtonClassNames = [defaults.cardLikeButtonClassName];

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  if (isLiked) {
    const cardLikeButtonClassNameAttributed = `${defaults.cardLikeButtonClassName}_active`;
    cardLikeButtonClassNames.push(cardLikeButtonClassNameAttributed);
  }

  const cardLikeButtonFinalClassName = cardLikeButtonClassNames.join(' ');

  function handleImageClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    if (card.isTemporarilyLocal) return;
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    if (card.isTemporarilyLocal) return;
    props.onCardDelete(card);
  }

  return (
    <li className="element">
      <img onClick={handleImageClick} className="element__image" alt={card.name} src={card.link} />
      <button onClick={handleDeleteClick} type="reset" className={cardDeleteButtonFinalClassName} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            type="button"
            className={cardLikeButtonFinalClassName}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
});

export default Card;
