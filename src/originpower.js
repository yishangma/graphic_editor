import Vue from 'vue'
import App from './App.vue'
import store from './store'
import '@/assets/style/main.less'
import './plugins/iview.js'
// import eventbus from '../src/assets/EventBus'
import vClickOutside from 'v-click-outside'
import utils from './global/utils/index'
import config from './config/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(vClickOutside)
Vue.use(ElementUI)
// Vue.config.productionTip = false

// import vClickOutside from 'v-click-outside'

export default function (options) {
  const {
    el,
    props
  } = options

  if (props) {
    // 合并配置
    ['storage', 'infoPanel', 'storage'].forEach(key => {
      if (props.hasOwnProperty.call(key) && props[key] && props[key] instanceof Object) {
        config[key] = {
          ...config[key],
          ...props[key]
        }
      }
    })
    // 处理tools
    if (props.hasOwnProperty.call('tools') && props.tools && props.tools instanceof Object) {
      config.tools = props.tools
    } else {
      const disableTools = Array.isArray(props.disableTools) ? props.disableTools : []
      const enableTools = Array.isArray(props.enableTools) ? props.enableTools : []
      const shortcutMap = props.shortcutMap || {}
      config.tools = config.tools(config.system, disableTools, enableTools, shortcutMap)
    }
    // 处理materials
    if (Array.isArray(props.materials)) {
      config.materials = props.materials
    } else {
      const enableMaterials = props.enableMaterials || {}
      config.materials = config.materials(enableMaterials)
    }
  } else {
    config.tools = config.tools(config.system)
    config.materials = config.materials()
  }

  // 挂载 $X 命名空间
  Vue.prototype.$X = {
    utils,
    config
  }
  // 注册指令
  Vue.use(vClickOutside)

  if (el) {
    return new Vue({
      el,
      render: h => h(App, {
        props,
        ref: 'App'
      }),
      computed: {
        editorRef() {
          return this.$refs.editor
        },
        editor() {
          return this.editorRef.editor
        }
      },
      methods: {
        // 接收数据，并进行渲染
        read(data, isActualSize) {
          this.editor.read(data)
          if (isActualSize) {
            // 缩放到实际大小
            this.editorRef.doZoom({
              name: 'actualSize'
            })
          }
        },
        // 获取图数据
        save() {
          return this.editor.save()
        },
        // 获取图中所有节点的实例
        getNodes() {
          return this.editor.getNodes()
        },
        // 获取图中所有边的实例
        getEdges() {
          return this.editor.getEdges()
        },
        // 将画布上的元素导出为图片
        downloadImage(name, type, backgroundColor) {
          return this.editor.downloadImage(name, type, backgroundColor)
        },
        // 将画布上元素生成为图片的 URL
        toDataURL(type, backgroundColor) {
          return this.editor.toDataURL(type, backgroundColor)
        }
      }
    })
  }
}
