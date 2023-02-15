import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef()
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar(inputRef.current.value)
  }
  return (
    <PopupWithForm
      formName="avatar-form"
      name="edit-avatar"
      title="Обновить аватар"
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="form__input"
        id="_type_link-avatar"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__error form__error_type_link-avatar"></span>
    </PopupWithForm>
  )
}
