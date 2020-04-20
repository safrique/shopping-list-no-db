class ListFactory {
  static addList () {
    console.log(`adding new list...`)
  }

  static displayList (name) {
    console.log(`name=${name} -- data=${localStorage[name]}`)
  }

  static getListPrefix () { return `list.` }

  // static getListItemId () { return `list_li` }
  //
  // setMainDivElement () { this.main_menu_element = this.fragment.getElementById(this.getMainMenuId()) }

  static getListDivId () { return `list_div` }

  static getListId () { return `list_ol` }

  static getList () {
    let ol = this.getOrderedList()
    ol.appendChild(this.getListItems())
    return ol
  }

  static getListDiv () {

  }

  static getMainId (name) { return name.replace(this.getListPrefix(), ``).replace(` `, `_`) }

  static getOrderedList () {
    let ol = document.createElement(`ol`)
    ol.id = this.getListId()
    return ol
  }

  static getListItems () {
    let fragment = document.createDocumentFragment()

    for (let item in localStorage) {
      if (localStorage.hasOwnProperty(item) && item.substr(0, this.getListPrefix().length) === this.getListPrefix()) {
        fragment.appendChild(this.getListItem(item))
      }
    }

    return fragment
  }

  static getListItem (name) {
    let li = document.createElement(`le`)
    li.appendChild(this.getCheckboxSpan(name))
    li.appendChild(this.getTextSpan(name))
    return li
  }

  static getTextSpan (name) {
    let span_text = document.createElement(`span`)
    span_text.innerHTML = name.replace(this.getListPrefix(), ``)
    return span_text
  }

  static getCheckboxSpan (name) {
    let span_cb = document.createElement(`span`)
    span_cb.appendChild(this.getCheckbox(name))
    return span_cb
  }

  static getCheckbox (name) {
    let cb = document.createElement(`checkbox`)
    cb.id = name.replace(`list.`, ``).replace(` `, `_`)
    // cb.onchange
    return cb
  }
}