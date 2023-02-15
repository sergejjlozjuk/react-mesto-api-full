/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react'

export default function ImagePopup({onClose, card, isOpen}) {
  return (
    <div
      className={`popup popup_type_open-image  ${
        isOpen && 'popup_active'
      }`}
      onClick={onClose}
    >
      <div className="popup__open-image">
        <button
          className="popup__close popup__close_type_card"
          type="button"
        ></button>
        <img
          className="popup__main-image"
          alt="картинка"
          src={card.link}
        />
        <h2 className="popup__image-title">
          {card.name}
        </h2>
      </div>
    </div>
  )
}
