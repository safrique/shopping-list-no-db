class Menu {
  constructor () { this.setDefaults() }

  setDefaults () {
    this.add_new_list = this.setNewListElement()
    this.delete_lists_button = this.setDeleteListsElement()
    this.fragment = this.setFragment()
    this.menu = this.setMenuElement()
    this.name = this.setNameElement()
    this.rename = this.setRenameElement()
  }

  setDeleteListsElement () { return `` }

  setFragment () { return new DocumentFragment() }

  setMenuElement () { return `` }

  setNameElement () { return `` }

  setNewListElement () { return `` }

  setRenameElement () { return `` }
}