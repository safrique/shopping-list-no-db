import { AbstractService } from './AbstractService.js'
import { Helper } from '../Helpers/Helper.js'
import { Div } from '../Factories/Components/Div.js'
import { OrderedList } from '../Factories/Components/OrderedList.js'

export class MenuService extends AbstractService {
// export class MenuService  {
  // Menu has:
  //  - Title
  //  - Rename Title button
  //  - Menu of lists
  //  - Add list component

  setDefaults () {
    super.setDefaults()
    this.addButton(`Rename Menu`, Helper.renameElement,
      [`${this.getThisPrefix().replace('.', '_')}name`, this.getThisPrefix() + `name`])
    // console.log(`menu`, this)
    this.buildMenu()
    this.bindComponents()
  }

  getHeaderType () { return `h2` }

  getName () { return `List of lists` }

  assignButton (name, button) {
    // console.log(`name=${name} -- button=`, button)
    switch (name) {
      case `add_test_lists`:
        this.add_test_lists = button
        // console.log(`assign add_test_lists=`, this.add_test_lists, `button=`, button)
        break
      case `reset_test_lists`:
        this.reset_test_lists = button
        break
      case `clear_local_storage`:
        this.clear_local_storage = button
        break
      default:
        button.style.marginLeft = `8em`
        this.rename_title = button
    }
  }

  getThisPrefix () { return this.prefixes_obj.menu }

  buildMenu () {
    let prefix = this.getThisPrefix().replace(`.`, `_`)
    this.menu = new Div(`${prefix}div`).getComponent()
    this.menu.style.marginLeft = `3em`
    this.menu.appendChild(new OrderedList(`${prefix}ol`).getComponent())
  }

  static showList (name) {
    console.log(`showList: ${name}`)
  }

  bindComponents () {
    super.bindComponents()
    this.main_component.appendChild(this.menu)
  }
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