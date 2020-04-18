class ListFactory {
  static addList () {
    console.log(`adding new list...`)
  }

  static displayList (name) {
    console.log(`name=${name} -- data=${localStorage[name]}`)
  }

  static getListPrefix () { return `list.` }
}