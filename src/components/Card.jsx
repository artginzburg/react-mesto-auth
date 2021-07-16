import { memo } from 'react';

import { classNames } from '../utils/toClassNames';

import { useCurrentUser } from '../contexts/CurrentUserContext';

const defaults = {
  cardDeleteButtonClassName: 'element__trash-button',
  cardLikeButtonClassName: 'element__like-button',
};

const Card = memo(({ card, ...props }) => {
  card.likes = card.likes ?? [];

  const currentUser = useCurrentUser();

  if (card.isTemporarilyLocal) {
    card.owner = currentUser;
  }

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassNames = [
    defaults.cardDeleteButtonClassName,
    isOwn && `${defaults.cardDeleteButtonClassName}_visible`,
  ];

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassNames = [
    defaults.cardLikeButtonClassName,
    isLiked && `${defaults.cardLikeButtonClassName}_active`,
  ];

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
      <button
        onClick={handleDeleteClick}
        type="reset"
        {...classNames(cardDeleteButtonClassNames)}
      />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <button
            onClick={handleLikeClick}
            type="button"
            {...classNames(cardLikeButtonClassNames)}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
});

export default Card;
