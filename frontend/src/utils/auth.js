
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status);
    }
  }

  checkIn(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    .then(this.checkResponse)
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    })
    .then(this.checkResponse)
    .catch((err) => console.log(err));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }  
    })
    .then(this.checkResponse)
  }
}

const auth = new Auth("https://auth.nomoreparties.co")

export default auth;
