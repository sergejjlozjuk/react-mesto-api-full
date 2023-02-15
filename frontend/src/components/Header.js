import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import logo from '../images/header_logo.svg'

class Header extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (path) {
    this.props.history.push(path)
  }
  render() {
    return (
      <header className="header">
        <img className="header__logo" src={logo} alt="Россия" />
        <div className="header__container">
          <span className="header__email">{this.props.email}</span>
          <Switch>
            <Route path='/sign-in'>
            <button className="header__button" onClick={() =>this.handleClick('/sign-up')}>
            Регистрация
          </button>
            </Route>
            <Route path='/sign-up'>
            <button className="header__button"  onClick={() =>this.handleClick('/sign-in')}>
            Войти
          </button>
            </Route>
            <Route exact path='/'>
            <button className="header__button" onClick={this.props.signOut}>
            Выйти
          </button>
            </Route>
          </Switch>
        </div>
      </header>
    )
  }
}
export default withRouter(Header)