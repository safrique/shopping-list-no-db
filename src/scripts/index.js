let local_storage_supported = checkLocalStorage()
// console.log(`localStorage supported = ${local_storage_supported}`)

function checkLocalStorage () {
  try {
    let test = `test`
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

window.onload = () => {
  // localStorage.setItem(`list1`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list2`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list3`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list4`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)

  if (local_storage_supported) {
    displayMenu()
  } else { removeMainItems() }
}

function removeMainItems () {
  document.body.removeChild(document.getElementById(`main`))

  let main_header = document.getElementById(`main_header`)
  main_header.innerHTML = `localStorage not supported in browser!!`
  main_header.style.color = `red`
}

function displayMenu () {
  let main_div = document.getElementById(`main`)
  let menu = document.createElement(`ol`)
  menu.id = `menu`
  main_div.appendChild(menu)

  for (let list_name in localStorage) {
    if (localStorage.hasOwnProperty(list_name)) {
      try {
        JSON.parse(localStorage[list_name])
        // console.log(list_name, item)
        let li = getMenuListItem(list_name)
        menu.appendChild(li)
      } catch (e) { console.log(list_name, e)}
    }
  }
}

function getMenuListItem (name) {
  let a = document.createElement(`a`)
  a.onclick = () => getListElements(name)
  a.innerHTML = name
  a.style.cursor = `pointer`
  let s = document.createElement(`span`)
  s.appendChild(a)
  let li = document.createElement(`li`)
  li.appendChild(s)
  return li
}

function getListElements (name) {
  let main = document.getElementById(`main`)
  main.removeChild(document.getElementById(`menu`))

  let h2 = document.createElement(`h2`)
  h2.id = `list_name`
  h2.innerHTML = name
  main.appendChild(h2)

  let h_outs = document.createElement(`h4`)
  h_outs.innerHTML = `Outstanding Items:`
  main.appendChild(h_outs)

  let ol_outs = document.createElement(`ol`)
  ol_outs.id = `outs_items`
  main.appendChild(ol_outs)

  let i = document.createElement(`input`)
  i.type = `text`
  i.id = `add_item`

  let l = document.createElement(`label`)
  l.htmlFor = i.id
  l.innerHTML = `Add item: `
  main.appendChild(l)
  main.appendChild(i)

  let b = document.createElement(`button`)
  b.textContent = `Add item`
  b.onclick = () => addItem()
  main.appendChild(b)

  let s = document.createElement(`span`)
  s.id = `add_error`
  s.style.color = `red`
  main.appendChild(s)

  let h_comp = document.createElement(`h4`)
  h_comp.innerHTML = `Completed Items:`
  main.appendChild(h_comp)

  let ol_comp = document.createElement(`ol`)
  ol_comp.id = `comp_items`
  main.appendChild(ol_comp)

  displayList(name)
}

function displayList (name) {
  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  for (let list in localStorage) {
    if (localStorage.hasOwnProperty(list)) {
      try {
        let list_obj = JSON.parse(localStorage[list])
        // console.log(list, list_obj)

        if (name === list) {
          // console.log(`found list: ${name}`)

          // loop over object and get each key=>value pair
          for (let key in list_obj) {
            if (list_obj.hasOwnProperty(key)) {
              let items = getListItem(key)
              // console.log(`list=${list} -- key=${key}`, items)

              if (list_obj[key]) {
                items.cb.checked = true
                comp.appendChild(items.li)
                continue
              }

              items.cb.checked = false
              outs.appendChild(items.li)
            }
          }
          break
        }
      } catch (e) { console.log(list, e)}
    }
  }
}

function itemStatusChanged (cb) {
  let li = document.getElementById(cb.id.replace(`cb`, `li`))
  let list_item = document.getElementById(cb.id.replace(`cb`, `span`)).innerHTML
  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  if (cb.checked) {
    outs.removeChild(li)
    comp.appendChild(li)
  } else {
    comp.removeChild(li)
    outs.appendChild(li)
  }

  // console.log(`list_item=${list_item}`)
  // localStorage.setItem(list_item, cb.checked ? `checked` : ``)
  updateLocalstorage(list_item, cb.checked)
}

function updateLocalstorage (list_item, new_val) {
  let list_name = document.getElementById(`list_name`).innerHTML
  // console.log(`list_name=${list_name} -- list_item=${list_item} -- new_val=${new_val}`)
  // console.log(localStorage)

  for (let list in localStorage) {
    if (localStorage.hasOwnProperty(list) && list === list_name) {
      // console.log(`list=${list} -- val=${localStorage[list]}`)
      let items = JSON.parse(localStorage[list])
      // console.log(items)

      for (let key in items) {
        if (items.hasOwnProperty(key) && list_item === key) {
          // console.log(`list_item=${key} -- val=${items[key]} -- new_val=${new_val}`)
          items[key] = new_val
          break
        }
      }

      items = JSON.stringify(items)
      // console.log(`new_items`, items)
      localStorage[list] = items
      // console.log(localStorage)
      break
    }
  }
}

function getListItem (key) {
  let li = document.createElement(`li`)
  let s = document.createElement(`span`)
  let st = document.createElement(`span`)
  let cb = document.createElement(`input`)

  li.id = `li_${key}`
  cb.id = `cb_${key}`
  cb.type = `checkbox`
  cb.onchange = () => itemStatusChanged(cb)
  st.innerHTML = key
  st.id = `span_${key}`

  s.appendChild(cb)
  li.appendChild(s)
  li.appendChild(st)

  return { 'li': li, 'cb': cb }
}

function addItem () {
  console.log(`adding item...`)
  let item = document.getElementById(`add_item`)
  let error_span = document.getElementById(`add_error`)

  if (item.value === ``) {
    error_span.innerHTML = `Please enter a value to add!!`
    return false
  }

  error_span.innerHTML = ``
  // localStorage.setItem(item.value, `checked`)
  let new_item = getListItem(item.value)
  new_item.cb.checked = false
  document.getElementById(`outs_items`).appendChild(new_item.li)
  item.value = ``
}

function clearList () {

}

function clearLocalStorage () {
  if (confirm(`Are you sure you want to clear all list? This can't be undone!!`)) {
    localStorage.clear()
    let li = document.querySelectorAll(` li`)

    for (let i = 0, j = li.length; i < j; i++) {li[i].parentNode.removeChild(li[i])}
  }
}