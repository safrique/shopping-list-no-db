import { AbstractService } from './AbstractService.js'

export class MenuService {
  constructor () { return document.createElement(`div`) }
}

// class MenuService {
//   constructor () { this.setDefaults() }
//
//   setDefaults () {
//     this.setFragment()
//     this.setNameElement()
//     this.setMenuElement()
//     this.setNewListElement()
//     // this.setCreateTestListsElement()
//     // this.setDeleteListsElement()
//     // this.setRenameElement()
//     // this.setResetTestListsElement()
//     this.bindElements()
//   }
//
//
//   setCreateTestListsElement () { this.create_test_lists = `` }
//
//   setDeleteListsElement () { this.delete_lists_button = `` }
//
//   setFragment () {
//     this.fragment = Helper.getFragment(MenuFactory.getMainMenuId())
//     this.setMainDivElement()
//   }
//
//   setMainDivElement () { this.main_menu_element = this.fragment.getElementById(MenuFactory.getMainMenuId()) }
//
//   setMenuElement () { this.menu = MenuFactory.getMenu() }
//
//   setNameElement () { this.name = Helper.getNameElement(MenuFactory.getMainMenuId(), `List of Lists`, `menu.name`) }
//
//   setNewListElement () { this.add_new_list = Helper.getInputGroup(`Add new list: `, `Add list`, `add_list_input`, `add_list_error`, ListFactory.addList) }
//
//   setRenameElement () { this.renameElement = `` }
//
//   setResetTestListsElement () { this.reset_test_lists = `` }
//
//   bindElements () {
//     this.main_menu_element.appendChild(this.name)
//     this.main_menu_element.appendChild(this.menu)
//     this.main_menu_element.appendChild(this.add_new_list)
//   }
// }
//
// // TODO:
// //  - Add error div under name