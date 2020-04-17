class List {
  constructor () { this.setDefaults() }

  setDefaults () {
    this.add_item = this.setAddItemElement()
    this.completed = this.setCompletedItems()
    this.copy = this.setCopyListElement()
    this.delete = this.setDeleteListElement()
    this.delete_completed = this.setDeleteCompletedItemsElement()
    this.delete_items = this.setDeleteAllItemsElement()
    this.name = this.setNameElement()
    this.outstanding = this.setOutstandingItems()
    this.rename = this.setRenameElement()
    this.return = this.setReturnToMenuElement()
  }

  setAddItemElement () { return `Add Item` }

  setCompletedItems () { return `` }

  setCopyListElement () { return `` }

  setDeleteAllItemsElement () { return `` }

  setDeleteCompletedItemsElement () { return `` }

  setDeleteListElement () { return `` }

  setNameElement () { return `` }

  setOutstandingItems () {return ``}

  setRenameElement () { return `` }

  setReturnToMenuElement () { return `` }

  addItem () {}

  copyList () {}

  deleteAllItems () {}

  deleteCompletedItems () {}

  deleteList () {}

  renameList () {}

  returnToMenu () {}
}