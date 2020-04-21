import { Component } from './Component.js'
import { ListItem } from './ListItem.js'
import { Span } from './Span.js'

export class OrderedList extends Component {
  constructor (id) {
    super()
    this.buildComponent(id)
  }

  buildComponent (id) {
    this.component = document.createElement(`ol`)
    this.component.id = id
    this.component.appendChild(this.getList(id))
  }

  getList (id) {
    let type = id.replace(`_ol`, ``)
    let prefix = `list_name.`
    // console.log(`id=${id} -- prefix=${prefix} -- type=${type}`)
    let fragment = document.createDocumentFragment()

    for (let item in localStorage) {
      // if (localStorage.hasOwnProperty(item)) console.log(`item=${item} data=`, localStorage[item])

      if (localStorage.hasOwnProperty(item) && item.substr(0, prefix.length) === prefix) {
        // console.log(`item=${item}`)
        if (type === `list`) return new ListItem(this.getContent(item.replace(prefix, ``), type)).getComponent()
        fragment.appendChild(new ListItem(this.getContent(item.replace(prefix, ``), type)).getComponent())
      }
    }

    return fragment
  }

  getContent (data, type) {
    if (type === `menu`) { return new Span(`link`, data).getComponent() }
  }

  // getList (data) {
  //   console.log(`list data: `, data)
  //   data = JSON.parse(data)
  //   console.log(`list data: `, data)
  //   let fragment = document.createDocumentFragment()
  //
  //   for (let item in data) {
  //     if (data.hasOwnProperty(item)) fragment.appendChild(new ListItem(data[item]))
  //   }
  // }
}