import { memo } from 'react';

import { useCurrentUser } from '../contexts/CurrentUserContext';
import checkImageLoading from '../utils/checkImageLoading';
import { classNames } from '../utils/toClassNames';

const Card = memo(({ card, ...props }) => {
  card.likes = card.likes ?? [];

  const currentUser = useCurrentUser();

  if (card.isTemporarilyLocal) {
    card.owner = currentUser;
  }

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleImageClick(e) {
    if (checkImageLoading(e.target)) {
      // UX - this makes user unable to open an unloaded image
      props.onCardClick(card);
    }
  }
  function handleImageError(e) {
    // UI for images that failed to load
    e.target.style.cursor = 'default';
    e.target.title = `Failed to load image: "${card.name}"`;
  }

  function handleLikeClick() {
    if (card.isTemporarilyLocal) return;
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    if (card.isTemporarilyLocal) return;
    props.onCardDelete(card);
  }

  const authorInfo = `Автор: ${card.owner.name} · ${card.owner.about}`;
  const authorInfoDev = `${authorInfo}\n\n#${card.owner._id}\n${card.owner.avatar}`;

  return (
    <li {...classNames(['element', card.isTemporarilyLocal && 'element_appearing'])}>
      <img
        onError={handleImageError}
        onClick={handleImageClick}
        className="element__image"
        alt={card.name}
        src={card.link}
      />
      {isOwn && (
        <button onClick={handleDeleteClick} type="reset" className="element__trash-button" />
      )}
      <div className="element__container" title={authorInfo}>
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likes">
          <input
            checked={isLiked}
            type="checkbox"
            onChange={handleLikeClick}
            className="element__like-button"
            title={authorInfoDev}
          />
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
});

export default Card;
