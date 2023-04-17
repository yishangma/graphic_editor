import nodeControl from './nodeControl'
import previewCavans from './previewCavans'
const obj = {
  nodeControl,
  previewCavans
}
export default function (G6) {
  Object.values(obj).forEach(item => {
    G6.registerBehavior(item.name, item.options)
  })
}
