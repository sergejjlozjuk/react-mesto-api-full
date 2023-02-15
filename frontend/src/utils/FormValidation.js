export default class FormValidation {
  enableValidation(formName) {
    this.form = document.forms[formName]
    this.inputList = Array.from(this.form.getElementsByTagName('input'))
    this.submitButton = this.form.querySelector('.form__submit')
    this.inactiveButtonClass = 'form__submit_inactive'
    this.setEventlisteners()
    if (this.inputList.length) {
        this.disabledButton()
    } 
  }
  setEventlisteners() {
      this.inputList.forEach((input) => {
        input.addEventListener('input', this.handleInputEvent.bind(this))
      })
  }
  disableValidation () {
    if (this.inputList) {
        this.inputList.forEach(input => {
            input.removeEventListener('input', this.handleInputEvent.bind(this))
        })
    }
  }
  handleInputEvent(e) {
    this.toggleInputError(e.target)
    const valid = this.inputList.every((input) => input.validity.valid === true)
    if (valid) {
      this.enableButton()
    } else {
      this.disabledButton()
    }
  }
  toggleInputError(input) {
    input.validity.valid
      ? this.hideInputError(input)
      : this.showInputError(input)
  }
  showInputError(input) {
    const error = this.form.querySelector(`.form__error${input.id}`)
    error.classList.add('form__error_visible')
    error.textContent = input.validationMessage
  }
  hideInputError(input) {
    const error = this.form.querySelector(`.form__error${input.id}`)
    error.classList.remove('form__error_visible')
  }
  disabledButton() {
    this.submitButton.disabled = true
    this.submitButton.classList.add(this.inactiveButtonClass)
  }
  enableButton() {
    this.submitButton.disabled = false
    this.submitButton.classList.remove(this.inactiveButtonClass)
  }
}
