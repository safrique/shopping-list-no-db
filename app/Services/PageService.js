import { AbstractService } from './AbstractService.js'
import { ListService } from './ListService.js'
import { MenuService } from './MenuService.js'
import { Helper } from '../Helpers/Helper.js'

export class PageService extends AbstractService {
  // Page has components:
  //  - Fragment with a main component div
  //  - Title
  //  - Rename Title button
  //  - Main error component
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

  setDefaults () {
    super.setDefaults()
    this.setMainErrorComponent()
    this.addButton(`Rename Title`, Helper.renameElement,
      [`${this.getThisPrefix().replace('.', '_')}name`, this.getThisPrefix() + `name`])
    this.setMenuComponent()
    // this.setAddListComponent()
    this.addButton(`Add Test lists`, this.addTestLists, [])
    this.addButton(`Reset Test lists`, this.addTestLists, [true])
    this.addButton(`Clear local storage`, this.clearAppLocalStorage, [false])
    this.bindComponents()
  }

  setMainErrorComponent () {
    this.main_error = document.createElement(`div`)
    this.main_error.id = `main_page_error`
    this.main_error.style.color = `red`
    this.main_error.style.marginLeft = `3em`
  }

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

  addTestLists (reset = false) {}

  setMenuComponent () { this.menu = new MenuService() }

  setAddListComponent () {}

  setListComponent (name) { this.list = new ListService(name) }

  getThisPrefix () { return this.prefixes_obj.page }

  getName () { return `ToDo Lists` }

  getHeaderType () { return `h1` }

  bindComponents () {
    super.bindComponents()
    this.main_component.appendChild(this.main_error)
    // console.log(`menu.fragment=`, this.menu.fragment)
    this.main_component.appendChild(this.menu.fragment)
    this.main_component.appendChild(this.add_test_lists)
    this.main_component.appendChild(this.reset_test_lists)
    this.main_component.appendChild(this.clear_local_storage)
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