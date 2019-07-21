/* const fs = require('fs')

const timeoutScheduled = Date.now()
setTimeout(() => {
  const delay = Date.now() - timeoutScheduled
  console.log(`${delay}ms have paseed since I was scheduled`)
}, 4000)

fs.readFile('db.json', (err, data) => {
  const startCallback = Date.now()
  while (Date.now() - startCallback < 10) {
    // empty
  }
})
*/

// const a = function recurse(i) {
//   while (i < 10000) {
//     process.nextTick(a(i += 1))
//   }
// }
// a(0)


// const b = function c(i) {
//   console.log(i)
// }
// b(2)

// const d = function recurse1(i, end) {
//   if (i > end) {
//     console.log('done')
//   } else {
//     console.log(i)
//     setImmediate(d, i + 1, end)
//   }
// }
// d(0, 11)
const a = Buffer.from('hello')
const b = a.toString()
console.log(a)
console.log(b)
