<template>
  <div class="main-editor" @contextmenu.stop.prevent>
    <ToolBar :editorData="editorData" :toolList="toolList" :currentItem="currentItem"></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelLeft :materialsList="materialsList"></PanelLeft>
    <PanelRight :toolList="toolList" :currentItem="currentItem"></PanelRight>
    <ClickRight :editorData="editorData" :toolList="toolList"></ClickRight>
    <History ref="history" @on-revert="doRevert"></History>
  </div>
</template>

<script>
import ToolBar from './containers/ToolBar.vue'
import Sketchpad from './containers/Sketchpad.vue'
import PanelLeft from './containers/PanelLeft.vue'
import PanelRight from './containers/PanelRight.vue'
import ClickRight from './containers/ClickRight.vue'
// import eventbus from '../assets/EventBus'
import History from './containers/History.vue'
import G6 from './global/g6/index.js'
// 全屏
import screenfull from 'screenfull'
import utils from './global/g6/utils'
import * as G6Util from '@antv/util'
import Mousetrap from 'mousetrap'
export default {
  name: 'MainEdiotr',
  components: {
    ToolBar,
    Sketchpad,
    PanelLeft,
    PanelRight,
    History,
    ClickRight
  },
  data() {
    return {
      graph: null,
      materialsList: [],
      toolList: [],
      currentItem: []
    }
  },
  computed: {
    editorData() {
      return this.graph && this.graph.$D ? this.graph.$D : null
    }
  },
  methods: {
    initInfo(data = {}) {
      this.editorInfo = {
        ...this.defInfo,
        ...data
      }
    },
    doAddNode(info) {
      const node = {
        id: G6Util.uniqueId(),
        draggable: true,
        type: info.type,
        label: info.defaultLabel,
        labelCfg: {
          position: 'center',
          style: {
            fontSize: 16,
            stroke: '#000000'
          }
        },
        width: info.width,
        height: info.height,
        minWidth: info.minWidth,
        minHeight: info.minHeight,
        // 匹配自定义锚点
        anchorPoints: info.anchorPoints,
        // 定义shapeControl
        shapeControl: info.shapeControl
      }
      this.graph.emit('graph:addNode', node)
    },
    doAddOptionsData(data) {
      this.graph.emit('editor:setItem', data)
    },
    // 这是第三次创建画布 最终的样式效果
    createGraph() {
      const _t = this
      const { toolList, shortcutMap } = this.$X.config.tools
      this.toolList = toolList
      console.log(toolList, 'toolList')
      console.log('存储', this.$X.config.storage.prefix)

      const materials = this.$X.config.materials
      this.shortcutMap = shortcutMap
      this.materialList = materials
      this.$X.utils.storage.set('toolList', toolList, this.$X.config.storage.prefix)
      this.$X.utils.storage.set('shortcutMap', shortcutMap, this.$X.config.storage.prefix)
      this.$X.utils.storage.set('materials', materials, this.$X.config.storage.prefix)
      console.log(materials[0].children, 'materials')
      // this.materialsList = materials
      this.$X.utils.storage.set('log', {
        current: null,
        list: []
      }, this.$X.config.storage.prefix)
      const el = this.$el
      // 画板
      const sketchpad = el.querySelector('#sketchpad')
      // this.registerNode()
      const grid = new G6.Grid()
      this.graph = new G6.Graph({
        container: sketchpad,
        width: sketchpad.clientWidth, // 获取的是父盒子sketch的高度和宽度
        height: sketchpad.clientHeight,
        fitView: true,
        fitViewPadding: 20,
        autoPaint: true,
        modes: {
          edit: [
            {
              type: 'node-control',
              config: {
                shapeControlPoint: {
                  // 是否在缩放、旋转节点时更新所有与之相连的边
                  updateEdge: false
                },
                dragNode: {
                  // 是否在拖拽节点时更新所有与之相连的边
                  updateEdge: false
                },
                // 是否支持在节点上添加文本
                nodeLabel: true,
                // 是否支持在边上添加文本
                edgeLabel: true,
                // tooltip 是否启用
                tooltip: {
                  shapeControl: true,
                  dragNode: true,
                  dragEdge: true
                },
                // 是否启用对齐线
                alignLine: {
                  enable: false,
                  style: {
                    stroke: '#FFA500',
                    lineWidth: 1
                  }
                }
              }
            }
          ],
          default: ['node-control'],
          preview: [
            'zoom-canvas',
            'drag-canvas',
            'preview-canvas'
          ]
        },
        groupType: 'rect',
        groupStyle: {
          default: {
            lineWidth: 1,
            stroke: '#29B6F2',
            strokeOpacity: 1,
            fill: '#29B6F2',
            fillOpacity: 0.1,
            opacity: 1,
            minDis: 0,
            maxDis: 0
          }
        },
        plugins: [grid]
      })
      this.graph.$D = {
        fill: '#FFFFFF',
        fillOpacity: 1,
        lineColor: '#000000',
        strokeOpacity: 1,
        lineWidth: 1,
        lineType: 'x-line',
        lineDash: 'solid',
        startArrow: false,
        endArrow: false,
        lineAppendWidth: 10,
        autoRotate: true
      }
      this.graph.setMode('edit')
      // 在写一下函数之后才能够放大或者缩小图形 即点击事件有响应
      this.graph.on('canvas:mousedown', this.canvasMousedown)
      // 绑定事件
      this.graph.on('node:mousedown', this.nodeMousedown)
      this.graph.on('node:mouseover', this.nodeHover)
      this.graph.on('node:mouseout', this.nodeOut)
      this.graph.on('edge:mousedown', this.edgeMousedown)
      this.graph.on('editor:getItem', function (data) {
        this.currentItem = data
      })
      this.graph.on('editor:setItem', function (data) {
        console.log(data, '小日本')
        data.forEach((item, index) => {
          const model = item.model
          // if (item.type === 'edge') {
          //   TODO 处理箭头
          // }
          const shapeItem = this.graph.findById(item.id)
          if (!index) {
            // 更新第一个节点
            this.graph.updateItem(shapeItem, model)
          } else {
            // FIXME 更新同组节点，只更新样式部分
            this.editor.updateItem(shapeItem, {
              style: data[0].model.style
            })
          }
        })
        this.graph.paint()
      })
      this.graph.on('editor:contextmenu', function (data) {
        this.$X.utils.eventbus.$emit('editor/contextmenu/open', data)
      })
      this.graph.on('editor:record', function (from) {
        // 更新操作日志
        console.log('editor:record from', from)
        this.updateLog({
          action: 'record',
          data: {
            time: new Date(),
            content: this.graph.save()
          }
        })
      })
      this.bindShortcuts()
    },
    canvasMousedown() {
      const _t = this
      this.doClearAllStates()
      // 更新currentItem
      this.currentItem = []
    },
    nodeMousedown(event) {
      const _t = this
      this.doClearAllStates()
      this.graph.setItemState(event.item, 'active', true)
    },
    nodeHover(event) {
      const _t = this
      // FIXME 当节点未激活时才可设置hover true状态
      if (!event.item.hasState('active')) {
        this.graph.setItemState(event.item, 'hover', true)
      }
    },
    nodeOut(event) {
      const _t = this
      this.graph.setItemState(event.item, 'hover', false)
    },
    edgeMousedown(event) {
      const _t = this
      this.doClearAllStates()
      // console.log('_edgeMousedown', event)
      if (event.item && !event.item.destroyed) {
        this.graph.setItemState(event.item, 'active', !event.item.hasState('active'))
      }
    },
    doClearAllStates() {
      const _t = this
      if (!this.graph) {
        return
      }
      // 批量操作时关闭自动重绘，以提升性能
      this.graph.setAutoPaint(false)
      this.graph.getNodes().forEach(function (node) {
        this.graph.clearItemStates(node, ['active', 'hover', 'selected'])
      })
      this.graph.getEdges().forEach(function (edge) {
        this.graph.clearItemStates(edge, ['active', 'hover', 'selected'])
      })
      this.graph.paint()
      this.graph.setAutoPaint(true)
    },
    // 3月8日添加
    doZoom(info, position) {
      const _t = this
      // 缩放率
      let ratio = 1
      let center
      if (position) {
        center = position
      } else {
        const width = this.graph.get('width')
        const height = this.graph.get('height')
        center = {
          x: width / 2,
          y: height / 2
        }
      }
      // if (info.name === 'zoom') {
      //   this.graph.zoomTo(info.data, center)
      // } else
      if (['Fangda', 'Suoxiao'].includes(info.name)) {
        const currentRatio = this.graph.getZoom()
        const step = 0.1
        ratio = info.name === 'Suoxiao' ? currentRatio - step : currentRatio + step
        ratio = ratio.toFixed(1)
        // 缩放视窗窗口到一个固定比例
        this.graph.zoomTo(ratio, center)
        // 处理选中，更新toolList
        const toolList = []
        const toolListData = this.$X.utils.storage.get('toolList', this.$X.config.storage.prefix)
        if (Array.isArray(toolListData)) {
          toolListData.forEach(target => {
            if (target.enableTool) {
              if (target.name === 'zoom') {
                target.selected = null
                target.custom = {
                  ...target.custom,
                  enable: true,
                  label: (ratio * 1000 / 10) + '%',
                  data: ratio
                }
              }
              toolList.push(target)
            }
          })
          this.toolList = toolList
          this.$X.utils.storage.set('toolList', toolList, this.$X.config.storage.prefix)
        }
      } else if (info.name === 'actualSize') {
        ratio = 1
        this.graph.zoomTo(ratio, center)
      }
    },
    handleToolTrigger(info) {
      console.log(info, '别拿老乡凤梨')
      const _t = this
      let isRecord = false
      switch (info.name) {
        // case 'chexiao':
        // 清空日志
        case 'clear': {
          // 更新操作日志
          this.updateLog({
            action: info.name
          })
          if (['chexiao'].includes(info.name)) {
            const log = this.$X.utils.storage.get('log', this.$X.config.storage.prefix)
            console.log(log, 'kog')
            this.$nextTick(function () {
              if (log.list.length) {
                if (log.current === 0) {
                  const data = log.list[0]
                  if (data === null) {
                    // 清除
                    this.graph.clear()
                    this.graph.paint()
                  } else {
                    // 渲染
                    this.graph.read(data.content)
                    this.graph.paint()
                    // 缩放到实际大小
                    this.doZoom({
                      name: 'actualSize'
                    })
                  }
                } else {
                  const data = log.list[log.current]
                  // 渲染
                  this.graph.read(data.content)
                  this.graph.paint()
                  // 缩放到实际大小
                  this.doZoom({
                    name: 'actualSize'
                  })
                }
              }
            })
            // 更新currentItem
            this.currentItem = []
          }
          break
        }
        // 删除逻辑 键盘删除
        case 'delete': {
          const nodes = []
          // 获取画板中的node节点 forEach遍历 把所有的node节点放入nodes数组中，之后选择node在removeItem
          this.graph.getNodes().forEach(node => {
            if (node.hasState('active')) {
              isRecord = true
              nodes.push(node)
            }
          })
          nodes.forEach(node => {
            this.graph.removeItem(node)
          })
          this.graph.getEdges().forEach(edge => {
            if (edge.hasState('active')) {
              isRecord = true
              this.graph.removeItem(edge)
            }
          })
          this.currentItem = []
          break
        }
        // 历史记录
        case 'history': {
          const ref = this.$refs[info.name]
          if (ref && ref.show) {
            ref.show()
          }
          break
        }
        // 填充颜色
        case 'backgroundColor': {
          this.graph.$D.fill = info.data
          this.graph.getNodes().forEach(node => {
            if (node.hasState('active')) {
              isRecord = true
              const { style } = node.getModel()
              this.graph.updateItem(node, {
                style: {
                  ...style,
                  fill: info.data
                }
              })
            }
          })
          break
        }
        case 'fullscreen': {
            if (screenfull.enabled) {
                screenfull.toggle()
          }
          break
        }
        // 放大
        case 'Fangda':
        case 'Suoxiao':
        case 'actualSize': {
          this.doZoom(info)
          break
        }
        // 下载
        case 'Download': {
          console.log('Download 了了了')
          const fileName = this.$X.utils.filters.formatDate(new Date(), 'YYYYMMDDhhmmss')
          console.log(fileName, 'FileName的')
          console.log(info, 'info.data')
          if (info.data === 'image') {
            this.graph.downloadImage(fileName)
          } else if (info.data === 'json') {
            let content = this.graph.save()
            content = JSON.stringify(content)
            const blob = new Blob([content], {
              type: 'application/json;charset=UTF-8'
            })
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.textContent = 'Download json'
            link.href = url
            link.download = fileName
            link.click()
            // no longer need to read the blob so it's revoked
            URL.revokeObjectURL(url)
          }
          break
        }
        case 'lineType': {
          this.graph.$D.lineType = info.data
          this.graph.getEdges().forEach(edge => {
            if (edge.hasState('active')) {
              isRecord = true
              this.graph.updateItem(edge, {
                type: info.data
              })
              this.graph.refreshItem(edge)
              // 备注 refreshItem和updateItem在/src/global/g6/behavior/nodeControl
            }
          })
          break
        }
        case 'clearAll': {
          this.$Modal.confirm({
            title: '提示',
            // 确认清空画布？
            content: '确认清空画布？',
            onOk: function () {
              // 更新操作日志
              this.updateLog({
                action: 'clear'
              })
              this.graph.clear()
              this.graph.paint()
            }
          })
          // 更新currentItem
          this.currentItem = []
          break
        }
      }
    },
    bindShortcuts() {
      const _t = this
      const toolListData = this.$X.utils.storage.get('toolList', this.$X.config.storage.prefix)
      if (Array.isArray(toolListData)) {
        toolListData.forEach(item => {
          if (item.enableTool && item.shortcuts) {
            Mousetrap.bind(item.shortcuts.key, function (e) {
              if (e.preventDefault) {
                e.preventDefault()
              } else {
                // internet explorer
                e.returnValue = false
              }
              this.handleToolTrigger({
                name: item.name,
                data: {}
              })
              return false
            })
          }
        })
      }
      // 绑定按键事件
      document.addEventListener('keyup', function () {
        this.$X.utils.eventbus.$emit('editor/contextmenu/close')
      })
    },
    doRevert(data) {
      console.log(data, 'doRevert')
      if (!data) {
        return
      }
      // 清空画布
      this.graph.clear()
      this.currentItem = []
      this.graph.data(data)
      this.graph.render()
      this.graph.getNodes().forEach(node => {
        const model = node.getModel()
        const radian = model.radian
        const keyShape = node.getKeyShape()
        keyShape.resetMatrix()
        keyShape.rotate(radian)
        const group = this.graph.get('group')
        // 更新shapeControl
        utils.shapeControl.rotate(model, group, radian)
        // 更新锚点
        utils.anchor.rotate(model, group, radian)
      })
      // 更新操作日志
      this.updateLog({
        action: 'loadData',
        data: {
          time: new Date(),
          content: this.graph.save()
        }
      })
    },
    // 更新log
    updateLog(data) {
      console.log(data, '更新的data')
      const _t = this
      // if (!data.hasOwnProperty.call('action') || !data.action) {
      //   return
      // }
      const oldLog = JSON.parse(JSON.stringify(this.$X.utils.storage.get('log', this.$X.config.storage.prefix)))
      console.log(oldLog, 'oldLog')

      const log = {
        current: null,
        list: []
      }
      switch (data.action) {
        // 记录
        case 'record':
          if (data.data) {
            if (oldLog.current === null) {
              oldLog.list = []
            } else if (oldLog.list.length - 1 > oldLog.current) {
              const removeCount = oldLog.list.length - 1 - oldLog.current
              oldLog.list.splice(oldLog.current + 1, removeCount)
            }
            if (this.maxLogSize !== null && oldLog.list.length > this.maxLogSize) {
              oldLog.list.splice(0, 1)
            }
            log.list = [
              ...oldLog.list,
              JSON.parse(JSON.stringify(data.data))
            ]
            log.current = log.list.length - 1
          }
          break
        // 撤销
        case 'chexiao':
          log.list = [
            ...oldLog.list
          ]
          log.current = oldLog.current - 1 < 0 ? 0 : oldLog.current - 1
          break
        // 清空
        case 'clear':
          log.list = []
          log.current = null
          break
        case 'loadData':
          if (data.data) {
            if (oldLog.current === null) {
              log.list = [
                JSON.parse(JSON.stringify(data.data))
              ]
            } else {
              if (oldLog.list.length - 1 > oldLog.current) {
                const removeCount = oldLog.list.length - 1 - oldLog.current
                oldLog.list.splice(oldLog.current + 1, removeCount)
              }
              if (this.maxLogSize !== null && oldLog.list.length > this.maxLogSize) {
                oldLog.list.splice(0, 1)
              }
              log.list = [
                ...oldLog.list,
                JSON.parse(JSON.stringify(data.data))
              ]
            }
            log.current = log.list.length - 1
          }
          break
      }
      this.$X.utils.storage.set('log', log, this.$X.config.storage.prefix)
    }
  },
  created() {
    // 这里有个坑 createGraph不能用函数的形式 其次获取el要在mounted周期中 created中无 但是可以采用nextTick来获取
    this.initInfo()
    this.$nextTick(this.createGraph)
    this.$X.utils.eventbus.$on('editor/add/node', this.doAddNode)
    this.$X.utils.eventbus.$on('editor/tool/trigger', this.handleToolTrigger)
    console.log(this.graph, '小日本小日本')
    this.$X.utils.eventbus.$on('editor/currentItem/update',
      //   function (data) { // 在组件options中
      //   console.log(data, '世界人们大团结万岁')
      //   this.graph.emit('editor:setItem', data)
      // })
      this.doAddOptionsData
    )
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.main-editor {
  display: inline-block;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
  background: #f8f9fa;
}
</style>
