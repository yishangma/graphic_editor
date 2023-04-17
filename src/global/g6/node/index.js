import general from './general/index'
import arrow from './arrow/index'
const obj = {
  ...general,
  ...arrow
}
export default function (G6) {
  Object.values(obj).forEach(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
