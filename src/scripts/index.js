window.onload = () => {
  localStorage.setItem(`key1`, `checked`)
  localStorage.setItem(`key2`, ``)
  localStorage.setItem(`key3`, `checked`)
  localStorage.setItem(`key4`, ``)

  displayLists()
  // console.log(localStorage)
}

function displayLists () {
  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let items = getListItem(key)

      if (Boolean(localStorage[key]) === true) {
        items.cb.checked = true
        comp.appendChild(items.li)
        continue
      }

      items.cb.checked = false
      outs.appendChild(items.li)
    }
  }
}

function itemStatusChanged (cb) {
  let li = document.getElementById(cb.id.replace(`cb`, `li`))
  let key = document.getElementById(cb.id.replace(`cb`, `span`)).innerHTML
  // console.log(`key=${key} -- cb=${cb.checked}`)
  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  if (cb.checked) {
    outs.removeChild(li)
    comp.appendChild(li)
  } else {
    comp.removeChild(li)
    outs.appendChild(li)
  }

  localStorage.setItem(key, cb.checked ? `checked` : ``)
  // console.log(localStorage)
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
  let item = document.getElementById(`add_item`)
  let error_span = document.getElementById(`add_error`)

  if (item.value === ``) {
    error_span.innerHTML = `Please enter a value to add!!`
    return false
  }

  error_span.innerHTML = ``
  localStorage.setItem(item.value, `checked`)
  let new_item = getListItem(item.value)
  new_item.cb.checked = false
  document.getElementById(`outs_items`).appendChild(new_item.li)
  item.value = ``
}

function clearLocalStorage () {
  if (confirm(`Are you sure you want to clear the list? This can't be undone!!`)) {
    localStorage.clear()
    let li = document.querySelectorAll(`li`)

    for (let i = 0, j = li.length; i < j; i++) { li[i].parentNode.removeChild(li[i])}
  }
}