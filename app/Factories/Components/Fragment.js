class Fragment extends Component {
  constructor (id) {
    super()
    this.buildComponent(id)
  }

  buildComponent (id) {
    this.component = document.createDocumentFragment()
    let div = document.createElement(`div`)
    div.id = id
    this.component.appendChild(div)
  }
}