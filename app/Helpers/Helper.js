export class Helper {
  static renameElement (what, storage_name = false) {
    console.log(`name=${what} -- storage_name=${storage_name}`)
    what = document.getElementById(what)
    let new_name = prompt(`Please enter new text to change to...`, what.innerHTML)

    let error = document.getElementById(`main_page_error`)
    error.innerHTML = ``

    if (new_name === ``) {
      error.innerHTML = `Please add a valid value to change the text to!!`
      return false
    }

    what.innerHTML = new_name

    if (storage_name) Helper.updateLocalStorage(storage_name, new_name)
  }

  static updateLocalStorage (storage_name, new_val) {
    if (localStorage.getItem(storage_name)) localStorage.setItem(storage_name, new_val)
    console.log(localStorage)
  }

  // static getFragment (id) {
  //   let frag = new DocumentFragment()
  //   let div = document.createElement(`div`)
  //   div.id = id
  //   frag.appendChild(div)
  //   return frag
  // }
  //
  // static getNameElement (header_id, header_text, header_name, header_type = `h2`) {
  //   let h = document.createElement(header_type)
  //   h.id = header_id
  //   let storage_item = localStorage.getItem(header_name)
  //
  //   if (storage_item) {
  //     header_text = storage_item
  //   } else { localStorage.setItem(header_name, header_text) }
  //
  //   h.innerHTML = header_text
  //   return h
  // }
  //
  // static getInputGroup (label_text, button_text, input_id, error_id, func) {
  //   let div = document.createElement(`div`)
  //
  //   let label = document.createElement(`label`)
  //   label.innerHTML = label_text
  //
  //   let input = document.createElement(`input`)
  //   input.id = input_id
  //   input.type = `text`
  //
  //   let button = document.createElement(`button`)
  //   button.innerHTML = button_text
  //   button.onclick = () => func()
  //
  //   let error = document.createElement(`div`)
  //   error.id = error_id
  //
  //   div.appendChild(label)
  //   div.appendChild(input)
  //   div.appendChild(button)
  //   div.appendChild(error)
  //   return div
  // }
}