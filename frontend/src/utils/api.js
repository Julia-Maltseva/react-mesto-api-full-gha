class Api {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    checkResponse(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res.status);
      }
    }
  
    getProfile() {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then(this.checkResponse)
    }
  
    getCards() {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then(this.checkResponse)
    }
  
    editProfile(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(this.checkResponse)
    }
  
    addCard(name, link) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          link
        })
      }).then(this.checkResponse)
    }
  
    deleteCard(id) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        })
        .then(this.checkResponse)
    }
  
    deleteLike(id) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        })
        .then(this.checkResponse)
      .catch(console.log)
    }
  
    addLike(id) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        })
        .then(this.checkResponse)
    }

    toggleLike(id, isLiked) {
      if (isLiked) {
        return this.deleteLike(id)
      } else {
        return this.addLike(id)
      }
    }
  
    addAvatar(data) {
      const token = localStorage.getItem('token');
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",  
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(this.checkResponse)
    }
  } 

  const api = new Api({
    baseUrl: 'https://api.mestoappjm.nomoredomains.monster',
    /*headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }*/
  });
  
  export default api;
  