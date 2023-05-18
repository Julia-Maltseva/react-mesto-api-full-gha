import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";

function AddPlacePopup(props) {

    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handlePlaceSumbit(evt) {
      evt.preventDefault();
      
      props.onUpdatePlace({
        name: name, 
        link: link
      })
    }

    function handleChangeName(evt) {
      setName(evt.target.value)
    }

    function handleChangeLink(evt) {
      setLink(evt.target.value)
    }

    useEffect(() => {
      setName('')
      setLink('')
    }, [props.isOpen])
  
  return (
    <PopupWithForm 
      name='addCard'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handlePlaceSumbit}
      buttonText='Создать'
      nameForm='formAdd'
      children={
        <>
        <input 
          className='popup__first-field popup__first-field_add popup__input'
          onChange={handleChangeName}
          id='image-name'
          type='text'
          name='imageName'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          value={name}
          required
        />
        <label className='popup__form-input'><span className='error' id='image-name-error'></span></label>
        <input 
          className='popup__second-field popup__second-field_add popup__input'
          onChange={handleChangeLink}
          id='image-link'
          type='url'
          name='imageLink'
          placeholder='Ссылка на картинку'
          value={link}
          required
        />
        <label className='popup__form-input'><span className='error' id='image-link-error'></span></label>
        </>
      }
    />
  )  
}

export default AddPlacePopup;