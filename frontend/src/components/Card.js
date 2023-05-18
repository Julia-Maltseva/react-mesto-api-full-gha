import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({card, likes, ...props}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );

  function handleClick() {
    props.onCardClick(card)
  }

  function handleLikeClick() {
    props.onCardLike(card)
  }

  function handleDeleteClick() {
    props.onCardDelete(card)
  }

  return (
    <div className="element">
      {isOwn && <button className="element__delete-button" onClick={handleDeleteClick} type="button" title="Удалить"></button>}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" title="Нравится"></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )  
}

export default Card;