const a = { name: 'li', '1': 2, '%': 3, 'data-blah': 5, prop: 4, 'while': 5 }
const item = {}
const atom = {
  value: 1,

  addValue(value) { // 要求简写
    return atom.value + value;
  },
}
const foo = () => {
  // ...
}
foo()
const short = function asdffsdf() {

}
short()
const b = 1
console.log(a, item, b)

const getname = (() => {
  console.log(1)
})()

getname()


