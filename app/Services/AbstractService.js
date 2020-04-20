import { Fragment } from '../Factories/Components/Fragment.js'
import { Title } from '../Factories/Components/Title.js'
import { Button } from '../Factories/Components/Button.js'

export class AbstractService {
  constructor () {
    this.checkInstantiation()
    this.setRequired()
    this.checkRequired()
    this.setDefaults()
  }

  checkInstantiation () {
    if (this.constructor === AbstractService) {
      throw new TypeError(`Abstract class "AbstractService" cannot be instantiated directly!!`)
    }
  }

  setRequired () {
    this.required = [
      `bindComponents`,
      `getName`,
      `getNameComponentId`,
      `setTitleComponent`,
    ]
  }

  checkRequired () {
    for (let i = 0, j = this.required.length; i < j; i++) {
      if (this.required[i] === undefined) {
        throw new TypeError(`Require method ${this.required[i]} undefined!!`)
      }
    }
  }

  setDefaults () {
    this.setAppPrefixes()
    this.setFragmentComponent()
    this.setMainComponent()
    this.setTitleComponent()
  }

  setFragmentComponent () {
    this.fragment = new Fragment(this.getMainComponentId()).getComponent()
  }

  setMainComponent () { this.main_component = this.fragment.getElementById(this.getMainComponentId()) }

  addButton (button_text, click_function, params) {
    this.assignButton(
      button_text.replace(` `, `_`).toLowerCase(),
      new Button(button_text, click_function, params).getComponent()
    )
  }

  /**
   * Assigns the button to the respective component
   *
   * @param name
   * @param button
   */
  assignButton (name, button) {}

  updateLocalStorage () {}

  setAppPrefixes () {
    this.prefixes_obj = {
      'page': `page.`,
      'menu': `menu.`,
      'list': `list.`,
    }

    this.setPrefixes()
  }

  setPrefixes () {
    this.prefixes_arr = []

    for (let key in this.prefixes_obj) {
      if (this.prefixes_obj.hasOwnProperty(key)) {
        this.prefixes_arr.push(this.prefixes_obj[key])
      }
    }
  }

  clearAppLocalStorage () {
    if (confirm(`Are you sure you want to delete all the app storage? This can't be undone!!`)) {
      for (let item in localStorage) {
        if (localStorage.hasOwnProperty(item)) {
          let pos = localStorage[item].indexOf(`.`) + 1
          if (pos) {
            if (this.prefixes_arr.indexOf(localStorage[item].substr(0, pos)) >= -1) {
              localStorage.removeItem(item)
            }
          }
        }
      }
    }
  }

  getHeaderType () { return `` }

  getName () { return `` }

  getThisPrefix () { return `` }

  getMainComponentId () { return `${this.getThisPrefix().replace('.', '_')}main_component` }

  getNameKey () { return `${this.getThisPrefix()}name` }

  getNameComponentId () { return `${this.getThisPrefix().replace('.', '_')}name` }

  setTitleComponent () {
    this.title = new Title(this.getNameComponentId(), this.getName(), this.getNameKey(), this.getHeaderType()).getComponent()
  }
}