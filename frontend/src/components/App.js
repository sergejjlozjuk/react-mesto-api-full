import React from 'react'
import { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import '../pages/index.css'
import { api } from '../utils/Api'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import Main from './Main'
import { currentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import Auth from '../utils/auth'
import canceled from '../images/canceled.svg'
import confirmed from '../images/confirmed.svg'
import Header from './Header'
import InfoTooltip from './InfoTooltip'

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfile] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlace] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatar] = useState(false)
  const [isImagePopupOpen, setIsImage] = useState(false)
  const [isDeletePopupOpen, setIsDelete] = useState(false)
  const [isInfoPopupOpen, setIsInfo] = useState(false)
  const [currentUser, setCurrenUser] = useState(false)
  const [cards, setCards] = useState([])
  const [confirmedDeleteCard, setConfirmDeleteCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: '',
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState(null)
  const [dataInfoPopup, setDataInfoPopup] = React.useState({
    text: '',
    image: '',
  })
  const auth = new Auth()
  const history = useHistory()
  function handleConfirmDelete() {
    handleCardDelete(confirmedDeleteCard)
  }
  function handleEditPlaceClick() {
    setIsAddPlace(!isAddPlacePopupOpen)
  }
  function handleEditAvatarClick() {
    setIsEditAvatar(!isEditAvatarPopupOpen)
  }
  function handleEditProfileClick() {
    setIsEditProfile(!isEditProfilePopupOpen)
  }
  function handleTrashClick(card) {
    setConfirmDeleteCard(card)
    setIsDelete(!isDeletePopupOpen)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImage(true)
  }
  function closeAllPopups() {
    setIsAddPlace(false)
    setIsEditAvatar(false)
    setIsEditProfile(false)
    setIsImage(false)
    setIsDelete(false)
    setIsInfo(false)
  }
  function handleCloseClickOverlay(e) {
    const elem = e.target.classList
    if (elem.contains('popup__close') || elem.contains('popup_active')) {
      closeAllPopups()
    }
  }
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then(
        (res) =>
          setCurrenUser({
            ...currentUser,
            name: res.name,
            about: res.about,
          }),
        closeAllPopups(),
      )
      .catch((err) => console.log(err))
  }
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data)
      .then((userData) => {
        closeAllPopups()
        setCurrenUser(userData)
      })
      .catch((err) => console.log(err))
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)
    if (isLiked) {
      api
        .deleteCardLike(card)
        .then((res) => {
          setCards(
            cards.map((c) => {
              return c._id === card._id ? res : c
            }),
          )
        })
        .catch((err) => console.log(err))
    } else {
      api
        .setCardLike(card)
        .then((res) => {
          setCards(
            cards.map((c) => {
              return c._id === card._id ? res : c
            }),
          )
        })
        .catch((err) => console.log(err))
    }
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then((res) => {
        setCards(
          cards.filter((c) => {
            return c._id !== card._id
          }),
        )
        closeAllPopups()
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  function handleAddPlaceSubmit(data) {
    api
      .setCard(data)
      .then((newCard) => {
        closeAllPopups()
        setCards([newCard, ...cards])
      })
      .catch((err) => console.log(err))
  }
  function checkAuthorization() {
    // setToken(localStorage.getItem('token'))
    // if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email)
          setLoggedIn(true)
          history.push('/')
        })
        .catch((err) => console.log(err))
    // }
  }
  function handleAuthorization(data) {
    auth
      .authorization(data)
      .then((res) => {
        localStorage.setItem('token', res.token)
        setToken(res.token)
        setLoggedIn(true)
        history.goForward('/')
      })
      .catch((err) => {
        setIsInfo(true)
        setDataInfoPopup({
          text: 'Что-то пошло не так!Попробуйте ещё раз.',
          image: canceled,
        })
        console.log(err)
      })
  }
  function handleRegistration(data) {
    auth
      .regisration(data)
      .then((res) => {
        setDataInfoPopup({
          text: 'Вы успешно зарегистрировались!',
          image: confirmed,
        })
        setIsInfo(true)
        history.push('/sign-in')
      })
      .catch((err) => {
        setDataInfoPopup({
          text: 'Что-то пошло не так!Попробуйте ещё раз.',
          image: canceled,
        })
        setIsInfo(true)
        console.log(err)
      })
  }
  function signOut() {
    localStorage.removeItem('token')
    setLoggedIn(false)
    setEmail('')
    setToken(null)
    setCurrenUser(null)
    history.push('/sign-in')
  }
  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isImagePopupOpen ||
    isDeletePopupOpen ||
    isInfoPopupOpen
  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res)
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])
  useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((res) => setCurrenUser(res.data))
        .catch((err) => console.log(err))
  }, [loggedIn])
  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuthorization()
    }
  })
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape)
    }
    return () => {
      document.removeEventListener('keydown', closeByEscape)
    }
  }, [isOpen])
  return (
    <currentUserContext.Provider value={currentUser}>
      <Header email={email} signOut={signOut}></Header>
      <Switch>
        <Route path="/sign-in">
          <Login handleAuthorization={handleAuthorization}></Login>
        </Route>
        <Route path="/sign-up">
          <Register
            setIsInfo={setIsInfo}
            handleRegistration={handleRegistration}
          ></Register>
        </Route>
        <ProtectedRoute
          loggedIn={loggedIn}
          component={Main}
          path={'/'}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleEditPlaceClick}
          onCardClick={handleCardClick}
          onTrashClick={handleTrashClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
        />
      </Switch>
      <InfoTooltip
        info={dataInfoPopup}
        isOpen={isInfoPopupOpen}
        onClose={handleCloseClickOverlay}
      ></InfoTooltip>
      <ConfirmDeletePopup
        isOpen={isDeletePopupOpen}
        onClose={handleCloseClickOverlay}
        onConfirmDelete={handleConfirmDelete}
      ></ConfirmDeletePopup>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={handleCloseClickOverlay}
        onUpdateUser={handleUpdateUser}
      ></EditProfilePopup>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={handleCloseClickOverlay}
        onAddPlace={handleAddPlaceSubmit}
      ></AddPlacePopup>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={handleCloseClickOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={handleCloseClickOverlay}
      />
      <Footer />
    </currentUserContext.Provider>
  )
}
