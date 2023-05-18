import React from 'react';

function Login(props) {
  
  const [userInfo, setUserInfo] = React.useState({email: '', password: ''})

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!userInfo.email || !userInfo.password) {
      return;
    }

    props.handleSignIn(userInfo);
    setUserInfo({email: '', password: ''})
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setUserInfo({...userInfo, [name]: value})
  }
    
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input 
          className="auth__input"
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          required
          onChange={handleChange}
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
        <button className="auth__button" type="submit">Войти</button>
      </form>
    </div>
  )  
}

export default Login;