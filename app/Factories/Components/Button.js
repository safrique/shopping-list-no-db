import { Component } from './Component.js'

export class Button extends Component {
  constructor (button_text, onclick, params) {
    super()
    this.buildComponent(button_text, onclick, params)
  }

  buildComponent (button_text, onclick, params) {
    this.button = document.createElement(`button`)
    this.button.innerHTML = button_text
    this.button.onclick = () => onclick(params ? params : undefined)
  }
}