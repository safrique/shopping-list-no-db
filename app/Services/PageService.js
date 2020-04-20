class PageService {
  constructor () { this.setDefaults() }

  getMainElementId () { return `main_page_div` }

  setDefaults () {
    this.setFragment()
    this.setNameElement()
    this.setMenu()
    this.bindElements()
  }

  setList (name) { this.list = new ListService(name) }

  setFragment () { this.fragment = Helper.getFragment(this.getMainElementId()) }

  setMenu () { this.menu = new MenuService() }

  setNameElement () { this.name = Helper.getNameElement(`main_header`, `ToDo Lists`, `page.name`, `h1`) }

  showList (name) {
    this.setList(name)
    // console.log(`body:`, document.body)
    document.body.removeChild(document.getElementById(this.menu.getMainMenuId()))
    document.body.appendChild(this.list.fragment)
    // console.log(`added list: ${name} -- body:`, document.body)
  }

  bindElements () {
    this.fragment.appendChild(this.name)
    this.fragment.appendChild(this.menu.fragment)
  }
}