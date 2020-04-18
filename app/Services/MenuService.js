class MenuService {
  constructor () { this.setDefaults() }

  setDefaults () {
    this.setFragment()
    this.setNameElement()
    this.setMenuElement()
    this.setNewListElement()
    // this.setCreateTestListsElement()
    // this.setDeleteListsElement()
    // this.setRenameElement()
    // this.setResetTestListsElement()
    this.bindElements()
  }

  setCreateTestListsElement () { this.create_test_lists = `` }

  setDeleteListsElement () { this.delete_lists_button = `` }

  setFragment () { this.fragment = Helper.getFragment(`main_menu_div`) }

  setMenuElement () { this.menu = MenuFactory.getMenu() }

  setNameElement () { this.name = Helper.getNameElement(`main_header_div`, `Menu`, `main_header`) }

  setNewListElement () { this.add_new_list = Helper.getInputGroup(`Add new list: `, `Add list`, `add_list_input`, `add_list_error`, ListFactory.addList) }

  setRenameElement () { this.rename = `` }

  setResetTestListsElement () { this.reset_test_lists = `` }

  bindElements () {
    this.fragment.appendChild(this.name)
    this.fragment.appendChild(this.menu)
    this.fragment.appendChild(this.add_new_list)
  }
}

// TODO:
//  - Add error div under name