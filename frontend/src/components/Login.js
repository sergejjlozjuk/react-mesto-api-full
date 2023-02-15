import React from 'react'

export default function Login({ handleAuthorization }) {
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
    handleAuthorization(data)
  }
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  )
}
