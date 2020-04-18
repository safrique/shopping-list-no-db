class PageService {
  name_element_id = `main_page_div`

  constructor () { this.setDefaults() }

  setDefaults () {
    this.setFragment()
    this.setNameElement()
    this.setMenu()
    this.bindElements()
  }

  set setList(name) { this.list = new ListService(name) }

  setFragment () { this.fragment = Helper.getFragment(this.name_element_id) }

  setMenu () { this.menu = new MenuService() }

  setNameElement () { this.name = Helper.getNameElement(`main_header`, `ToDo List`, `header.name`, `h1`) }

  bindElements () {
    this.fragment.appendChild(this.name)
    this.fragment.appendChild(this.menu.fragment)
  }
}