import Card from './Card';
import api from '../utils/api';
import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__photo">
          <button onClick={props.onEditAvatar} className="profile__avatar-button" type="button"></button>
          <img className="profile__avatar" alt="аватар" src={currentUser.avatar} style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        </div>
        <div className="profile__info">
          <div className="profile__info-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button" title="Редактировать"></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button" title="Добавить"></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => {
          return (
          <Card key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
          />
          )
        })
        }
      </section>
    </main>
  )  
}

export default Main;