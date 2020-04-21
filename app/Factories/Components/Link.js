import { Component } from './Component.js'

export class Link extends Component {
  constructor (text, onclick = false, href = false, target = false) {
    super()
    this.buildComponent(text, onclick, href, target)
  }

  buildComponent (text, onclick, href, target) {
    // console.log(`text=${text} -- onclick=${onclick} -- href=${href} -- target=${target}`)
    this.component = document.createElement(`a`)
    this.component.innerHTML = text
    if (href) this.component.href = href
    if (onclick) this.component.onclick = () => onclick(text)
    if (target) this.component.target = target
  }
}