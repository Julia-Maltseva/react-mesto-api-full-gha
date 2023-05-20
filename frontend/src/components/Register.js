import { Link } from 'react-router-dom';
import React from 'react';

function Register(props) {
  
  const [userInfo, setUserInfo] = React.useState({email: '', password: ''})

  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = userInfo;
    props.handleSignUp(email, password);
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setUserInfo({...userInfo, [name]: value})
  }
    
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input 
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
          required
        />
        <input 
          className="auth__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={userInfo.password}
          onChange={handleChange}
          required
        />
        <button className="auth__button" type="submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="auth__enter">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  )  
}

export default Register;