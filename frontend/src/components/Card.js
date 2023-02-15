/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { currentUserContext } from '../contexts/CurrentUserContext'

export default class Card extends React.Component {
  static contextType = currentUserContext
  constructor(props) {
    super(props)
    this.onCardLike = this.props.onCardLike
    this.onCardDelete = this.props.onCardDelete
  }
  handleDeleteClick() {
    this.props.onTrashClick(this.props.card)
  }
  render() {
    return (
      <article className="place">
        <button
          className={`place__trash ${
            this.props.card.owner._id === this.context._id
              ? ''
              : 'place__trash_inactive'
          }`}
          onClick={this.handleDeleteClick.bind(this)}
        ></button>
        <img
          className="place__image"
          src={this.props.card.link}
          onClick={() => this.props.onCardClick(this.props.card)}
          alt={this.props.card.name}
        />
        <div className="place__info">
          <h2 className="place__title">{this.props.card.name}</h2>
          <div className="place__like-container">
            <button
              className={`place__like ${
                this.props.card.likes.some(
                  (user) => user._id === this.context._id,
                ) && 'place__like_active'
              }`}
              type="button"
              onClick={() => this.props.onCardLike(this.props.card)}
            ></button>
            <span className="place__like-counter">
              {this.props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
    )
  }
}
