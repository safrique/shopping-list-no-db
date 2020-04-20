class ListService {
  constructor (name) { this.setDefaults(name) }

  setDefaults (name) {
    this.setName(name)
    this.setMainId()
    this.setFragment()
    this.setMainDiv()
    // this.setList()

    // this.setNameElement(name)
    // this.setAddItemElement()
    // this.setCompletedItems()
    // this.setCopyListElement()
    // this.setDeleteListElement()
    // this.setDeleteCompletedItemsElement()
    // this.setDeleteAllItemsElement()
    // this.setOutstandingItems()
    // this.setRenameElement()
    // this.setReturnToMenuElement()
    this.bindElements()
  }

  setName (name) { this.name = name }

  setMainId () { ListFactory.getListId(this.name) }

  setFragment () {
    this.fragment = Helper.getFragment(ListFactory.getListId())
  }

  setMainDiv () { this.main_div = this.fragment.getElementById(ListFactory.getListId()) }

  // setList () { this.main_div.appendChild(ListFactory.getList()) }

  setAddItemElement () { this.add_item = `Add Item` }

  setCompletedItems () { this.completed = `` }

  setCopyListElement () { this.copy = `` }

  setDeleteAllItemsElement () { this.delete_items = `` }

  setDeleteCompletedItemsElement () { this.delete_completed = `` }

  setDeleteListElement () { this.delete = `` }

  // setNameElement (name) { this.name = Helper.getNameElement(ListFactory.getMainListElementId(), name.replace(`list.`, ``), name) }

  setOutstandingItems () { this.outstanding = `` }

  setRenameElement () { this.rename = `` }

  setReturnToMenuElement () { this.return = `` }

  setMainListElement () { this.main_list_element = ListFactory.getElementById(ListFactory.getMainListElementId()) }

  addItem () {}

  copyList () {}

  deleteAllItems () {}

  deleteCompletedItems () {}

  deleteList () {}

  renameList () {}

  returnToMenu () {}

  bindElements () {
    // this.main_list_element.appendChild(this.name)
    this.main_div.appendChild(ListFactory.getList())
  }
}