import { Component } from './Component.js'

export class Div extends Component {
  constructor (id) {
    super()
    this.buildComponent(id)
  }

  buildComponent (id) {
    this.component = document.createElement(`div`)
    this.component.id = id
  }
}