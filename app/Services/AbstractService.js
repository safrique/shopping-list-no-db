class AbstractService {
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
    this.setFragmentComponent()
    this.setMainComponent()
  }

  setFragmentComponent () {
    this.fragment = new Fragment(this.getMainComponentId()).getComponent()
  }

  setMainComponent () { this.main_component = this.fragment.getElementById(this.getMainComponentId()) }

  rename (what) {}

  clearLocalStorage () {}

  getMainComponentId () { return `main_component` }

  getNameKey () { return `page.name` }

  getName () { return `ToDo Lists` }

  getHeaderType () { return `h1` }

  getNameComponentId () { return `page_name` }

  setTitleComponent () { this.title = new Title(this.getNameComponentId(), this.getName(), this.getNameKey(), this.getHeaderType()).getComponent() }
}