// import * as list from '../../app/Services/List'

`use strict`

let localStorage_supported = checkLocalStorageSupported()

// let list = new List()
// console.log(list.add_item)

// console.log(`localStorage supported = ${localStorage_supported}`)

function checkLocalStorageSupported () {
  try {
    let test = `check_localStorage_supported`
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

window.onload = () => {
  if (localStorage_supported) {
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

    for (let curr_list in localStorage) {
      if (list === curr_list) {
        if (reset) {
          console.log(`curr_list=${curr_list} -- data=${localStorage[curr_list]}`)
          localStorage.setItem(list, lists[list])
          console.log(`list ${list} reset...`)
        } else { console.log(`list ${list} already exists. exiting...`) }

        list_found = true
        break
      }
    }

    if (!list_found) {
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
  // console.log(`adding new list...`)
  let name = document.getElementById(`new_list_name`).value
  let error_span = document.getElementById(`add_error`)

  if (name === ``) {
    error_span.innerHTML = `Please add a valid list name to create a new list!!`
    return false
  }

  for (let curr_list in localStorage) {
    if (name === curr_list) {
      error_span.innerHTML = `Please use a list name not yet in use`
      return false
    }
  }

  error_span.innerHTML = ``
  localStorage.setItem(name, `{}`)
  displayMenu()
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

  let menu = document.getElementById(`menu`)
  if (menu) main.removeChild(menu)

  let list_div = document.getElementById(`menu`)
  if (list_div) main.removeChild(list_div)

  list_div = document.createElement(`div`)
  list_div.id = `list_div`
  main.appendChild(list_div)

  let h2 = document.createElement(`h2`)
  h2.id = `list_name`
  h2.innerHTML = name
  list_div.appendChild(h2)

  let ri = document.createElement(`input`)
  ri.id = `rename_input`
  ri.type = `text`
  let rl = document.createElement(`label`)
  rl.htmlFor = ri.id
  rl.innerHTML = `Rename list: `
  list_div.appendChild(rl)
  list_div.appendChild(ri)

  let rb = document.createElement(`button`)
  rb.onclick = () => renameList()
  rb.innerHTML = `Rename list`
  list_div.appendChild(rb)

  let rd = document.createElement(`div`)
  rd.style.color = `red`
  rd.id = `rename_error`
  list_div.appendChild(rd)

  let cob = document.createElement(`button`)
  cob.onclick = () => copyList()
  cob.innerHTML = `Copy list to a new list`
  list_div.appendChild(cob)

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

  let bc = document.createElement(`button`)
  bc.textContent = `Delete completed list items`
  bc.onclick = () => clearList()
  list_div.appendChild(bc)

  let bl = document.createElement(`button`)
  bl.textContent = `Delete ALL list items`
  bl.onclick = () => clearList(true)
  list_div.appendChild(bl)

  let bd = document.createElement(`button`)
  bd.textContent = `Delete list`
  bd.onclick = () => deleteList()
  list_div.appendChild(bd)

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
  updateLocalStorage(list_item, cb.checked)
}

function updateLocalStorage (list_item, new_val) {
  let list_name = document.getElementById(`list_name`).innerHTML
  // console.log(`list_name=${list_name} -- list_item=${list_item} -- new_val=${new_val}`)
  // console.log(localStorage)

  for (let list in localStorage) {
    if (localStorage.hasOwnProperty(list) && list === list_name) {
      // console.log(`list=${list} -- val=${localStorage[list]}`)
      let items = JSON.parse(localStorage[list])
      // console.log(items)

      let key_found = false

      for (let key in items) {
        if (items.hasOwnProperty(key) && list_item === key) {
          // console.log(`list_item=${key} -- val=${items[key]} -- new_val=${new_val}`)
          items[key] = new_val
          key_found = true
          break
        }
      }

      // console.log(`new_items`, items)
      if (!key_found) items[list_item] = new_val

      // console.log(`new_items`, items)
      items = JSON.stringify(items)
      // console.log(`new_items`, items)
      localStorage[list] = items
      // console.log(localStorage)
      return true
    }
  }
}

function getListItem (key) {
  let id = key.replace(` `, `_`)
  let li = document.createElement(`li`)
  let s = document.createElement(`span`)
  let st = document.createElement(`span`)
  let cb = document.createElement(`input`)

  li.id = `li_${id}`
  cb.id = `cb_${id}`
  cb.type = `checkbox`
  cb.onchange = () => itemStatusChanged(cb)
  st.innerHTML = key
  st.id = `span_${id}`

  s.appendChild(cb)
  li.appendChild(s)
  li.appendChild(st)

  return { 'li': li, 'cb': cb }
}

function addItem () {
  // console.log(`adding item...`)
  let item = document.getElementById(`add_item`)
  let error_span = document.getElementById(`add_error`)

  if (item.value === ``) {
    error_span.innerHTML = `Please enter a value to add!!`
    return false
  }

  error_span.innerHTML = ``
  let new_item = getListItem(item.value)
  new_item.cb.checked = false
  updateLocalStorage(item.value, false)
  document.getElementById(`outs_items`).appendChild(new_item.li)
  item.value = ``
}

function clearList (all = false) {
  if (confirm(`Are you sure you want to delete these items? This can't be undone!!`)) {
    // console.log(`clearing list: ${all ? 'all' : 'completed'} items...`)
    let list = document.getElementById(`list_name`).innerHTML

    for (let curr_list in localStorage) {
      if (localStorage.hasOwnProperty(curr_list) && list === curr_list) {
        if (all) {
          localStorage.setItem(list, `{}`)
          break
        }

        let data = JSON.parse(localStorage[curr_list])
        // console.log(`data`, data)

        for (let item in data) {
          if (data.hasOwnProperty(item) && data[item]) {
            // console.log(`deleting data[item]`, data[item])
            delete data[item]
          }
        }

        localStorage.setItem(list, JSON.stringify(data))
        break
      }
    }

    let li = document.querySelectorAll(`li`)
    // console.log(li)
    for (let i in li) {
      if (li.hasOwnProperty(i) && (all || li[i].firstChild.firstChild.checked)) {
        // console.log(`i=${i} -- li[i]`, li[i])
        // console.log(li[i].firstChild.firstChild.checked)
        li[i].parentElement.removeChild(li[i])
      }
    }
  }
}

function deleteList () {
  if (confirm(`Are you sure you want to delete this list? This can't be undone!!`)) {
    console.log(`deleting list...`)
    let list_name = document.getElementById(`list_name`).innerHTML

    for (let list in localStorage) {
      if (localStorage.hasOwnProperty(list) && list === list_name) {
        localStorage.removeItem(list)
      }
    }

    displayMenu()
  }
}

function clearLocalStorage () {
  if (confirm(`Are you sure you want to clear all list? This can't be undone!!`)) {
    localStorage.clear()
    displayMenu()

    let li = document.querySelectorAll(` li`)
    for (let i = 0, j = li.length; i < j; i++) {li[i].parentNode.removeChild(li[i])}
  }
}

function renameList () {
  let new_name = document.getElementById(`rename_input`).value
  // console.log(`rename list to ${new_name}`)
  let error_div = document.getElementById(`rename_error`)
  error_div.innerHTML = ``

  if (new_name === ``) {
    error_div.innerHTML = `Please enter a name to rename the list to!!`
    return false
  }

  error_div.innerHTML = ``
  let old_name = document.getElementById(`list_name`)
  // console.log(`rename list ${old_name.innerHTML} to ${new_name}...`)

  for (let list in localStorage) {
    if (localStorage.hasOwnProperty(list) && list === old_name.innerHTML) {
      localStorage.setItem(new_name, localStorage[list])
      localStorage.removeItem(old_name.innerHTML)
      old_name.innerHTML = new_name
      return true
    }
  }
}

function copyList () {
  let new_list = prompt(`Please enter a name for the list to copy to`)
  let error_div = document.getElementById(`rename_error`)
  error_div.innerHTML = ``

  if (new_list === ``) {
    error_div.innerHTML = `Please enter a valid list name to copy to`
    return false
  }

  console.log(new_list)
  error_div.innerHTML = ``
  let old_list = document.getElementById(`list_name`).innerHTML
  localStorage.setItem(new_list, localStorage.getItem(old_list))
  displayMenu()
}