/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { currentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card'

export default class Main extends React.Component {
  static contextType = currentUserContext
  constructor(props) {
    super(props)
    this.handleEditAvatarClick = props.onEditAvatar
    this.handleEditPlaceClick = props.onAddPlace
    this.handleEditProfileClick = props.onEditProfile
  }
  render() {
    return (
      <main className="main">
        <section className="user">
          <div className="user__profile">
            <img
              className="user__image"
              src={this.context.avatar}
              alt="Аватар"
            />
            <div
              className="user__image-overlay"
              onClick={this.handleEditAvatarClick}
            ></div>
            <h1 className="user__name">{this.context.name}</h1>
            <p className="user__info">{this.context.about}</p>
            <button
              className="user__change-button"
              type="button"
              onClick={this.handleEditProfileClick}
            ></button>
            <button
              className="user__add-button"
              type="button"
              onClick={this.handleEditPlaceClick}
            ></button>
          </div>
        </section>
        <section className="places">
          {this.props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={this.props.onCardClick}
              onCardLike={this.props.handleCardLike.bind(this)}
              onCardDelete={this.props.handleCardDelete.bind(this)}
              onTrashClick={this.props.onTrashClick}
            />
          ))}
        </section>
      </main>
    )
  }
}
