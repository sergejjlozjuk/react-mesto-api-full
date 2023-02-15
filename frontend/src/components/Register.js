import React from 'react'
import { Link } from 'react-router-dom'

export default function Register({ handleRegistration }) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  })
  function handleChange(e) {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    handleRegistration(data)
  }
  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form_input"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          className="login__form_input"
          placeholder="Пароль"
          name="password"
          type="password"
          onChange={handleChange}
        ></input>
        <button className="login__form_submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link className="login__link" to={'/sign-in'}>
        Уже зарегистрированы? Войти
      </Link>
    </div>
  )
}
