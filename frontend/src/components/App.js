import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Card from './Card';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessNotice, setIsSuccessNotice] = useState(false);
  const [isFailNotice, setIsFailNotice] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getProfile(), api.getCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData)
        
        setCards(cardList)
      })
      .catch((err) => console.log(err))
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
    .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards(prevState => prevState.filter((item) => item._id !== card._id))
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    api.editProfile({name: data.name, about: data.about})
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api.addAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLogIn() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }

  function handleSignIn(userInfo) {
    auth.authorize(userInfo.email, userInfo.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleLogIn();
          setUserEmail(userInfo.email);
          navigate('/mesto', {replace: true})
        }
      })
      .catch((err) => {
        console.log(err);
        setIsFailNotice(true);
      })  
  }

  function handleSignUp(email, password) {
    auth.checkIn(email, password)
      .then(() => {
        setIsSuccessNotice(true);
      })
      .catch((err) => {
        console.log(err);
        setIsFailNotice(true);
      })
  }

  function closePopupNotice() {
    if (isSuccessNotice) {
      setIsSuccessNotice(false);
      navigate('/sign-in', {replace: true});
    } else {
      setIsFailNotice(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          handleLogIn();
          setUserEmail(res.data.email);
          navigate('/mesto');
        })
        .catch((err) => {console.log(err)})
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} handleLogOut={handleLogOut} userEmail={userEmail} />
        <Routes>

          <Route path='/sign-up' element={
            <Register 
              handleSignUp={handleSignUp}
              successNotice={isSuccessNotice}
              failNotice={isFailNotice}
            />
          }
          />

          <Route path='/sign-in' element={
            <Login 
              handleSignIn={handleSignIn}
              failNotice={isFailNotice}
            />
          }
          />

          <Route path='/' element={
            loggedIn ? <Navigate to='/mesto' replace /> : <Navigate to='/sign-up' replace />
          }
          />

          <Route path='/mesto' element={
            <>
            <ProtectedRoute loggedIn={loggedIn}
              element={Main} 
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                setSelectedCard={setSelectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
            />

            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onUpdatePlace={handleAddPlaceSubmit}
            />

            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <ImagePopup 
              selectedCard={selectedCard}
              isOpen={selectedCard}
              onClose={closeAllPopups}
            />

            <Footer />
            </>
           } 
          />
  
        </Routes>

        <InfoTooltip 
        isSuccessNotice={isSuccessNotice}
        isFailNotice={isFailNotice}
        onClose={closePopupNotice}
        />
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
