class Helper {
  static getFragment (id) {
    let frag = new DocumentFragment()
    let div = document.createElement(`div`)
    div.id = id
    frag.appendChild(div)
    return frag
  }

  static getNameElement (header_id, header_text, header_name, header_type = `h2`) {
    let h = document.createElement(header_type)
    h.id = header_id
    let storage_item = localStorage.getItem(header_name)

    if (storage_item) {
      header_text = storage_item
    } else { localStorage.setItem(header_name, header_text) }

    h.innerHTML = header_text
    return h
  }

  static getInputGroup (label_text, button_text, input_id, error_id, func) {
    let div = document.createElement(`div`)

    let label = document.createElement(`label`)
    label.innerHTML = label_text

    let input = document.createElement(`input`)
    input.id = input_id
    input.type = `text`

    let button = document.createElement(`button`)
    button.innerHTML = button_text
    button.onclick = () => func()

    let error = document.createElement(`div`)
    error.id = error_id

    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(button)
    div.appendChild(error)
    return div
  }
}