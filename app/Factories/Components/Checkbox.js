import { Component } from './Component.js'

export class Checkbox extends Component {
  constructor (id) {
    super()
    this.buildComponent(id)
  }

  buildComponent (id) {
    this.component = document.createElement(`checkbox`)
    this.component.id = id
    this.component.checked = false
  }
}