window.onload = () => {
  localStorage.setItem(`key1`, `true`)
  localStorage.setItem(`key2`, ``)
  localStorage.setItem(`key3`, `true`)
  localStorage.setItem(`key4`, ``)

  displayLists()
}

function displayLists () {
  // console.log(localStorage)
  // console.log(localStorage.length)

  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let li = document.createElement(`li`)
      let s = document.createElement(`span`)
      let st = document.createElement(`span`)
      let cb = document.createElement(`input`)

      li.id = `li_${key}`
      cb.id = `cb_${key}`
      cb.type = `checkbox`
      cb.onchange = () => itemStatusChanged(cb)
      // st.id = `span_${key}`
      st.innerHTML = key

      s.appendChild(cb)
      li.appendChild(s)
      li.appendChild(st)

      console.log(`${key}=${Boolean(localStorage[key])}`)
      if (Boolean(localStorage[key]) === true) {
        cb.checked = false
        outs.appendChild(li)
        continue
      }

      cb.checked = true
      comp.appendChild(li)
    }
  }

  // console.log(outs)
  // console.log(comp)
}

function itemStatusChanged (cb) {
  let li = document.getElementById(cb.id.replace(`cb`, `li`))
  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)
  // console.log(outs)
  // console.log(comp)
  // console.log(cb)
  // console.log(`${cb.id}=${cb.checked}`)
  // console.log(li)

  if (cb.checked) {
    outs.removeChild(li)
    comp.appendChild(li)
  } else {
    comp.removeChild(li)
    outs.appendChild(li)
  }
}