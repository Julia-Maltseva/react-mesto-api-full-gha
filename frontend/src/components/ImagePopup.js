

function ImagePopup({selectedCard, ...props}) {
  return (
    <div className={`popup popup_type_show-photo ${selectedCard ? 'popup_opened' : ''}`}>
      <div className="popup__container-photo">
        <button className="popup__close-button popup__close-button_photo" onClick={props.onClose} type="button" title="Закрыть"></button>
        <img className="popup__photo" alt={selectedCard ? selectedCard.name : ''} src={selectedCard?.link || ''} />
        <p className="popup__photo-title">{selectedCard && selectedCard.name}</p>
    </div>
    </div>
  )  
}

export default ImagePopup;