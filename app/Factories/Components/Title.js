import { Component } from './Component.js'

export class Title extends Component {
  constructor (header_id, header_text, header_name, header_type = `h2`) {
    super()
    this.buildComponent(header_id, header_text, header_name, header_type = `h2`)
  }

  buildComponent (header_id, header_text, header_name_key, header_type = `h2`) {
    this.component = document.createElement(header_type)
    this.component.id = header_id
    let storage_item = localStorage.getItem(header_name_key)

    if (storage_item) {
      header_text = storage_item
    } else { localStorage.setItem(header_name_key, header_text) }

    this.component.innerHTML = header_text
  }
}