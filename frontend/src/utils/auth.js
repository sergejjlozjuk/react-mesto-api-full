export default class Auth {
  constructor() {
    this.baseURL = 'http://localhost:3000'
  }
  _getResponseData (res) {
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
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    })
    .then(this._getResponseData)
  }

  checkToken(token) {
    return fetch(`${this.baseURL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'credentials': 'include',
      },
    })
    .then(this._getResponseData)
  }
}
