import { Component } from './Component.js'

export class ListItem extends Component {
  constructor (contents) {
    super()
    this.buildComponent(contents)
  }

  buildComponent (contents) {
    // console.log(`contents:`, contents)
    this.component = document.createElement(`li`)
    if (typeof contents === `string`) {
      this.component.innerHTML = contents
      return true
    }
    this.component.appendChild(contents)
    // console.log(`contents:`, contents, ` -- li component:`, this.component)
  }
}