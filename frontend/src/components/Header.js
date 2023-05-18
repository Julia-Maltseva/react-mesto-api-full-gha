import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  const location = useLocation();

  function handleSignOut() {
    localStorage.removeItem('jwt');
    props.handleLogOut();
  }

  return (
    <header className="header">
      <img src={logo} alt="логотип шапки" className="header__logo" />
      {props.loggedIn ? (
        <div className="header__container">
          <p className="header__email">{props.userEmail}</p>
          <Link className="header__way_exit" to="/sign-in" onClick={handleSignOut}>Выйти</Link>
        </div>
      ) : location.pathname === "/sign-up" ? (
          <Link className="header__way" to="/sign-in" onClick={handleSignOut}>Войти</Link>
      ) : (
          <Link className="header__way" to="/sign-up" onClick={handleSignOut}>Регистрация</Link>  
      )}
    </header>
  )  
}

export default Header;