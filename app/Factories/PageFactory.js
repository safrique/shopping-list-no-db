// Builds the page
import { PageService } from '../Services/PageService.js'

console.log(`localStorage`, localStorage)
let page = new PageService()

window.onload = () => {
  document.body.appendChild(page.fragment)
  console.log(`localStorage`, localStorage)
}

// function testMe (input) {
//   console.log(`testing 123... name=${input}`)
//   page.showList(input)
// }

// function viewList (name) {
//   page.showList(name)
// }