let local_storage_supported = checkLocalStorageSupported()

// console.log(`localStorage supported = ${local_storage_supported}`)

function checkLocalStorageSupported () {
  try {
    let test = `check_local_storage_supported`
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

window.onload = () => {
  if (local_storage_supported) {
    if (!localStorage.length) addTestLists()
    displayMenu()
  } else { removeMainItems() }
}

function addTestLists (reset = false) {
  // localStorage.setItem(`list1`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list2`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list3`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)
  // localStorage.setItem(`list4`, `{"item1":true, "item2":false, "item3":true, "item4":false}`)

  let lists = {
    'list1': `{"item1":true, "item2":false, "item3":true, "item4":false}`,
    'list2': `{"item1":true, "item2":false, "item3":true, "item4":false}`,
    'list3': `{"item1":true, "item2":false, "item3":true, "item4":false}`,
    'list4': `{"item1":true, "item2":false, "item3":true, "item4":false}`,
  }

  for (let list in lists) {
    console.log(`list=${list} -- data=${lists[list]}`)
    let list_found = false

    for (let old_list in localStorage) {
      // if (reset || list !== old_list) {
      //   localStorage.setItem(list, lists[list])
      //   console.log(`list ${list} ${reset ? 'reset' : 'added'}...`)
      //   continue
      // }
      //
      // console.log(`list ${list} already exists...`)

      if (list === old_list) {
        if (reset) {
          localStorage.setItem(list, lists[list])
          console.log(`list ${list} rest...`)
        } else { console.log(`list ${list} already exists...`) }

        // TODO: fix logic here
        list_found = true
        continue
      }

      localStorage.setItem(list, lists[list])
      console.log(`list ${list} added...`)
    }
  }

  displayMenu()
}

function removeMainItems () {
  document.body.removeChild(document.getElementById(`main`))

  let main_header = document.getElementById(`main_header`)
  main_header.innerHTML = `localStorage not supported in browser!!`
  main_header.style.color = `red`
}

function displayMenu () {
  let main_div = document.getElementById(`main`)
  let list_div = document.getElementById(`list_div`)
  if (list_div !== null) main_div.removeChild(list_div)
  let menu = document.getElementById(`menu`)
  if (menu !== null) main_div.removeChild(menu)

  menu = document.createElement(`div`)
  menu.id = `menu`
  main_div.appendChild(menu)

  let ol = document.createElement(`ol`)
  menu.appendChild(ol)

  for (let list in localStorage) {
    if (localStorage.hasOwnProperty(list)) {
      try {
        JSON.parse(localStorage[list])
        // console.log(list, item)
        let li = getMenuListItem(list)
        ol.appendChild(li)
      } catch (e) { console.log(list, e)}
    }
  }

  getAddListButton(menu)
  addTestListButtons(menu)
}

function addTestListButtons (parent) {
  let d = document.createElement(`div`)
  d.id = `test_lists_div`
  parent.appendChild(d)

  let b = document.createElement(`button`)
  b.textContent = `Add Test Lists`
  b.onclick = () => addTestLists()
  d.appendChild(b)

  let br = document.createElement(`button`)
  br.textContent = `Reset Test Lists`
  br.onclick = () => addTestLists(true)
  br.style.marginLeft = `1em`
  d.appendChild(br)
}

function getAddListButton (parent) {
  let l = document.createElement(`label`)
  l.innerHTML = `Add new list: `
  parent.appendChild(l)

  let i = document.createElement(`input`)
  i.id = `new_list_name`
  i.type = `text`
  parent.appendChild(i)

  let b = document.createElement(`button`)
  b.onclick = () => addList()
  b.textContent = `Add list`
  parent.appendChild(b)

  let s = document.createElement(`span`)
  s.id = `add_error`
  s.style.color = `red`
  parent.appendChild(s)
}

function addList () {
  console.log(`adding new list...`)
  let name = document.getElementById(`new_list_name`).value
  let error_span = document.getElementById(`add_error`)

  if (name === ``) {
    error_span.innerHTML = `Please add a valid list name to create a new list!!`
    return false
  }

  localStorage.setItem(name, `{}`)
  error_span.innerHTML = ``
  displayMenu()
}

function removeAllChildren (parent) {
  console.log(`parent`, parent)

  for (let child in parent.children) {
    if (parent.children.hasOwnProperty(child) && parent.children[child].id !== `clear_all_lists`) {
      console.log(parent, child, parent.children[child])
      console.log(`removing child...`)
      parent.removeChild(parent.children[child])
    }
  }

  console.log(`parent`, parent)
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

  let list_div = document.createElement(`div`)
  list_div.id = `list_div`
  main.appendChild(list_div)

  let h2 = document.createElement(`h2`)
  h2.id = `list_name`
  h2.innerHTML = name
  list_div.appendChild(h2)

  let h_outs = document.createElement(`h4`)
  h_outs.innerHTML = `Outstanding Items:`
  list_div.appendChild(h_outs)

  let ol_outs = document.createElement(`ol`)
  ol_outs.id = `outs_items`
  list_div.appendChild(ol_outs)

  let i = document.createElement(`input`)
  i.type = `text`
  i.id = `add_item`

  let l = document.createElement(`label`)
  l.htmlFor = i.id
  l.innerHTML = `Add item: `
  list_div.appendChild(l)
  list_div.appendChild(i)

  let b = document.createElement(`button`)
  b.textContent = `Add item`
  b.onclick = () => addItem()
  list_div.appendChild(b)

  let s = document.createElement(`span`)
  s.id = `add_error`
  s.style.color = `red`
  list_div.appendChild(s)

  let h_comp = document.createElement(`h4`)
  h_comp.innerHTML = `Completed Items:`
  list_div.appendChild(h_comp)

  let ol_comp = document.createElement(`ol`)
  ol_comp.id = `comp_items`
  list_div.appendChild(ol_comp)

  let br = document.createElement(`button`)
  br.textContent = `Return to lists menu`
  br.onclick = () => displayMenu()
  list_div.appendChild(br)

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