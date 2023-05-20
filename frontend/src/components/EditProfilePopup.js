import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function EditProfilePopup(props) {

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,  
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value)
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value)
  }
  
  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText='Сохранить'
      nameForm='formEdit'
      onSubmit={handleSubmit}
      children={
        <>
        <input 
        className='popup__first-field popup__first-field_edit popup__input'
        onChange={handleChangeName}
        value={name || ''}
        type='text'
        name='userName'
        id='user-name'
        placeholder='Имя'
        minLength='2'
        maxLength='40'
        required
        />
        <label className='popup__form-input'><span className='error' id='user-name-error'></span></label>
        <input 
        className='popup__second-field popup__second-field_edit popup__input'
        onChange={handleChangeDescription}
        value={description || ''}
        type='text'
        name='userJob'
        id='job'
        placeholder='О себе'
        minLength='2'
        maxLength='40'
        required
        />
        <label className='popup__form-input'><span className='error' id='job-error'></span></label>
        </>
      }
    />
  )  
}

export default EditProfilePopup;