class MenuFactory {
  static getMainMenuId () { return `main_menu_div` }

  static getMenu () {
    let menu = document.createElement(`div`)
    menu.id = `menu_div`

    let ol = document.createElement(`ol`)
    ol.id = `menu_ol`
    menu.appendChild(ol)

    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.substr(0, 5) === ListFactory.getListPrefix()) {
        ol.appendChild(this.getMenuItem(key))
      }
    }

    return menu
  }

  static getMenuItem (name) {
    let li = document.createElement(`li`)
    li.appendChild(this.getItemLink(name))
    return li
  }

  static getItemLink (name) {
    let a = document.createElement(`a`)
    a.onclick = () => ListFactory.displayList(name)
    a.innerHTML = name.replace(ListFactory.getListPrefix(), ``)
    return a
  }
}