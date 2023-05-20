import success from '../images/UnionSuccess.png';
import fail from '../images/UnionFail.png';

function InfoTooltip(props) {
  
  return (
    <div className={`popup ${props.isSuccessNotice ? 'popup_opened' : props.isFailNotice ? 'popup_opened' : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={props.onClose} type="button" title="Закрыть"></button>
        <img className="popup__notice-image" src={props.isSuccessNotice ? success : fail} />
        <h2 className="popup__title_notice">
          {props.isSuccessNotice ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  )  
}

export default InfoTooltip;