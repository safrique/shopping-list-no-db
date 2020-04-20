import { AbstractService } from './AbstractService.js'
import { ListService } from './ListService.js'
import { MenuService } from './MenuService.js'
import { Button } from '../Factories/Components/Button.js'

export class PageService extends AbstractService {
  // Page has components:
  //  - Fragment with a main component div
  //  - Title
  //  - Rename Title button
  //  - Menu
  //  - Add list input component
  //  - Add Test lists button
  //  - Reset Test lists button
  //  - Clear localStorage button
  //  - List

  // Functionality:
  //  - On instantiation:
  //    * Create components
  //    * Bind components

  // constructor () {
  //   super()
  //   this.setDefaults()
  // }

  setDefaults () {
    super.setDefaults()
    this.setTitleComponent()
    this.addButton(`Rename Title`, this.rename, { 'rename': `title` })
    this.setMenuComponent()
    this.setAddListComponent()
    this.addButton(`Add Test lists`, this.addTestLists(), false)
    this.addButton(`Reset Test lists`, this.addTestLists(true), false)
    this.addButton(`Clear local storage`, this.clearLocalStorage(), false)
    this.bindComponents()
  }

  addButton (button_text, onclick, params) {
    this.assignButton(
      button_text.replace(` `, `_`).toLowerCase(),
      new Button(button_text, onclick, params).getComponent()
    )
  }

  assignButton (name, button) {
    switch (name) {
      case `add_test_lists`:
        this.add_test_lists = button
        break
      case `reset_test_lists`:
        this.reset_test_lists = button
        break
      case `clear_local_storage`:
        this.clear_local_storage = button
        break
      default:
        this.rename_title = button
    }
  }

  addTestLists (reset = false) {}

  setMenuComponent () { this.menu = new MenuService() }

  setAddListComponent () {}

  setListComponent (name) { this.list = new ListService(name) }

  bindComponents () {
    this.main_component.appendChild(this.title)
    // this.main_component.appendChild(this.rename_title)
    // this.main_component.appendChild(this.menu)
    // this.main_component.appendChild(this.add_test_lists)
    // this.main_component.appendChild(this.reset_test_lists)
    // this.main_component.appendChild(this.clear_local_storage)
  }
}

// class PageService {
//   constructor () { this.setDefaults() }
//
//   getMainElementId () { return `main_page_div` }
//
//   setDefaults () {
//     this.setFragment()
//     this.setNameElement()
//     this.setMenu()
//     this.bindElements()
//   }
//
//   setList (name) { this.list = new ListService(name) }
//
//   setFragment () { this.fragment = Helper.getFragment(this.getMainElementId()) }
//
//   setMenu () { this.menu = new MenuService() }
//
//   setNameElement () { this.name = Helper.getNameElement(`main_header`, `ToDo Lists`, `page.name`, `h1`) }
//
//   showList (name) {
//     this.setList(name)
//     // console.log(`body:`, document.body)
//     document.body.removeChild(document.getElementById(this.menu.getMainMenuId()))
//     document.body.appendChild(this.list.fragment)
//     // console.log(`added list: ${name} -- body:`, document.body)
//   }
//
//   bindElements () {
//     this.fragment.appendChild(this.name)
//     this.fragment.appendChild(this.menu.fragment)
//   }
// }