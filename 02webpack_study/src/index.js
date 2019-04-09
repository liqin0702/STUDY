import _ from 'lodash'
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'  // 如果不写../node_modules这个目录，系统会默认到这里面去找

  function component() {
    var element = document.createElement('div')
    element.innerHTML = _.join(['你好aa', 'webpac'], ' ')
    element.classList.add('hello')
    return element
  }


  document.body.appendChild(component())

// 下面这段代码，在webpack中默认只能处理一部分Es6语法，一些更高级的Es6或以上的语法，webpack是处理不了的；
// 这时候，就需要借助第三方的loader,来帮助webpack处理这些高级的语法，当第三方的的loader把高级语法转为低级语法后
// 会把结果交个webpack去打包到bundle.js中
// 通过babel，可以帮助我们将高级语法转换为低级语法
class Person {
	static info = {name:'zs', age: 20}
}
console.log(Person.info)
