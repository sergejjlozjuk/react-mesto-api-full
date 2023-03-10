class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }
  _getResponseData(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }
  _request(url, options) {
    return fetch(`${this.baseUrl}${url}`, options).then(this._getResponseData)
  }
  getInitialCards() {
    return this._request('/cards', {
      headers: this.headers,
      credentials: 'include',
    })
  }
  getUserInfo() {
    return this._request('/users/me', {
      headers: this.headers,
      credentials: 'include',
    })
  }
  editAvatar(link) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    })
  }
  setUserInfo(formValues) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about,
      }),
    })
  }
  setCard({ title, link }) {
    return this._request('/cards', {
      method: 'POST',
      headers: this.headers,
      credentials: 'include',
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    })
  }
  deleteCard(card) {
    return this._request(`/cards/${card._id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
  }
  setCardLike(card) {
    return this._request(`/cards/${card._id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include',
    })
  }
  deleteCardLike(card) {
    return this._request(`/cards/${card._id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.sergejj.nomoredomainsclub.ru',
  headers: {
    'Content-Type': 'application/json',
  },
})
export { api }
