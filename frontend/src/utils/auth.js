export default class Auth {
  constructor() {
    this.baseURL = 'https://api.mesto.sergejj.nomoredomainsclub.ru'
  }
  _getResponseData (res) {
    console.log(111,res)
    if (res.ok) {
        return res.json()
    } return Promise.reject(`Ошибка ${res.status}`)
  }
  regisration(data) {
    return fetch(`${this.baseURL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
    .then(this._getResponseData)
  }
  authorization(data) {
    return fetch(`${this.baseURL}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
    .then(this._getResponseData)
  }

  checkToken() {
    return fetch(`${this.baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData)
  }

  signOut() {
    return fetch(`${this.baseURL}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    .then(this._getResponseData)
  }
}
