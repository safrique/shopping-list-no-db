import { Component } from './Component.js'
import { Checkbox } from './Checkbox.js'
import { Link } from './Link.js'
import { MenuService } from '../../Services/MenuService.js'

export class Span extends Component {
  constructor (insert, data = false) {
    super()
    this.buildComponent(insert, data)
  }

  buildComponent (insert, data) {
    this.component = document.createElement(`span`)

    switch (insert) {
      case `checkbox`:
        this.component.appendChild(new Checkbox(data)).getComponent()
        break
      case `link`:
        this.component.appendChild(new Link(data, MenuService.showList).getComponent())
        break
      default:  // text
        this.component.innerHTML = data
    }
    // console.log(`Span: insert=${insert} -- data=${data}`)
  }
}