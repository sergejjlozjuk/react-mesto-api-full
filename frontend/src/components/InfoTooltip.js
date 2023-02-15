import React from 'react'

export default function InfoTooltip (data) {
    return(
        <div className={`popup ${data.isOpen && 'popup_active'}`} onClick={data.onClose}>
        <div className="popup__container">
            <button className="popup__close" type='button'></button>
            <img src={data.info.image} alt="ok" className="popup-info__image"></img>
            <h2 className="popup-info__title">{data.info.text}</h2>
        </div>
        </div>
    )
}