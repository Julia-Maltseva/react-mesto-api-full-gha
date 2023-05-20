import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const avatarLink = React.useRef();

    function handleSubmitAvatar(evt) {
      evt.preventDefault();
      props.onUpdateAvatar({
        avatar: avatarLink.current.value
      })  
    }

    React.useEffect(() => {
      avatarLink.current.value = ''
    }, [props.isOpen])
  
    return (
      <PopupWithForm 
        name='avatar'
        title='Обновить аватар'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmitAvatar}
        buttonText='Сохранить'
        nameForm='formAvatar'
        children={
          <>
          <input 
            name='avatarLink' 
            className='popup__first-field popup__input popup__first-field_avatar'
            ref={avatarLink}
            type='url' 
            placeholder='Ссылка на аватар' 
            required 
          />
          <label className='popup__form-input'><span className='error' id='avatar-link-error'></span></label>
          </>
        }
      />  
    )
}

export default EditAvatarPopup;