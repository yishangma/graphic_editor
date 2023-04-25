// import Vue from 'vue'
// import App from './App.vue'
// import store from './store'
// import '@/assets/style/main.less'
// import './plugins/iview.js'
// // import eventbus from '../src/assets/EventBus'
// import vClickOutside from 'v-click-outside'
// import utils from './global/utils/index'
// import config from './config/index'
// Vue.use(vClickOutside)

// Vue.config.productionTip = false
// // export default function (options) {
// //   const {
// //     el,
// //     props
// //   } = options

// //   if (props) {
// //     // 合并配置
// //     ['system', 'storage', 'infoPanel'].forEach(key => {
// //       if (props.hasOwnProperty.call(key) && props[key] && props[key] instanceof Object) {
// //         config[key] = {
// //           ...config[key],
// //           ...props[key]
// //         }
// //       }
// //     })
// //     // 处理tools
// //     if (props.hasOwnProperty.call('tools') && props.tools && props.tools instanceof Object) {
// //       config.tools = props.tools
// //     } else {
// //       const disableTools = Array.isArray(props.disableTools) ? props.disableTools : []
// //       const enableTools = Array.isArray(props.enableTools) ? props.enableTools : []
// //       const shortcutMap = props.shortcutMap || {}
// //       config.tools = config.tools(config.system, disableTools, enableTools, shortcutMap)
// //     }
// //     // 处理materials
// //     if (Array.isArray(props.materials)) {
// //       config.materials = props.materials
// //     } else {
// //       const enableMaterials = props.enableMaterials || {}
// //       config.materials = config.materials(enableMaterials)
// //     }
// //   } else {
// //     config.tools = config.tools(config.system)
// //     config.materials = config.materials()
// //   }
// // }
// // 挂载 $X 命名空间
// Vue.prototype.$X = {
//   utils,
//   config
// }

// new Vue({
//   store,
//   render: h => h(App)
// }).$mount('#app')

import originpower from './originpower.js'
// 初始化
originpower({
  el: '#app'
})
