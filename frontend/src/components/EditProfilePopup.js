import React from 'react'
import { currentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(currentUserContext)
  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [currentUser, isOpen])
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    })
  }
  function setValue(e) {
    const input = e.target
    if (input.name === 'name') {
      setName(input.value)
    } else {
      setDescription(input.value)
    }
  }
  return (
    <PopupWithForm
      name="user"
      formName="user-form"
      title="Редактировать профиль"
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="_type_name"
        className="form__input form__input_type_name"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
        onChange={setValue}
        value={name}
      />
      <span className="form__error form__error_type_name"></span>
      <input
        id="_type_info"
        className="form__input form__input_type_info"
        name="info"
        type="text"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        required
        onChange={setValue}
        value={description}
      />
      <span className="form__error form__error_type_info"></span>
    </PopupWithForm>
  )
}
