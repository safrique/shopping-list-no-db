export class Component {
  constructor () {
    this.component = ``
    this.setRequired()
    this.checkInstantiation()
    this.checkRequired()
  }

  checkInstantiation () {
    if (this.constructor === Component) {
      throw new TypeError(`Abstract class "Component" cannot be instantiated directly!!`)
    }
  }

  setRequired () { this.required = [`buildComponent`] }

  checkRequired () {
    for (let i = 0, j = this.required.length; i < j; i++) {
      if (this.required[i] === undefined) {
        throw new TypeError(`Require method ${this.required[i]} undefined!!`)
      }
    }
  }

  getComponent () { return this.component }
}