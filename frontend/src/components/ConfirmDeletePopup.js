import React from "react"
import PopupWithForm from "./PopupWithForm"

export default function ConfirmDeletePopup ({isOpen, onClose, onConfirmDelete}) {
    function handleSubmit (e) {
        e.preventDefault()
        onConfirmDelete()
    }
    return(
        <PopupWithForm
        formName="delete-form"
        name="confirm-delete"
        title="Вы уверены?"
        buttonText={'Да'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      />
    )
}