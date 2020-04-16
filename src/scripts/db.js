window.onload = () => {
  localStorage.setItem(`key1`, `true`)
  localStorage.setItem(`key2`, ``)
  localStorage.setItem(`key3`, `true`)
  localStorage.setItem(`key4`, ``)

  displayLists()
}

function displayLists () {
  console.log(localStorage)
  console.log(localStorage.length)

  let outs = document.getElementById(`outs_items`)
  let comp = document.getElementById(`comp_items`)

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      let li = document.createElement(`li`)
      let s = document.createElement(`span`)
      let st = document.createElement(`span`)
      let cb = document.createElement(`input`)

      cb.id = `cb_${key}`
      cb.type = `checkbox`
      st.id = `span_${key}`
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

  console.log(outs)
  console.log(comp)
}