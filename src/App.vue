<template>
  <div class="main-editor">
    <ToolBar :editorData="editorData" :toolList="tooList" :currentItem="currentItem"></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelLeft :materialsList="materialsList"></PanelLeft>
    <PanelRight :toolList="toolList" :currentItem="currentItem"></PanelRight>
    <History ref="history" @on-revert="doRevert"></History>
  </div>
</template>

<script>
import ToolBar from './containers/ToolBar.vue'
import Sketchpad from './containers/Sketchpad.vue'
import PanelLeft from './containers/PanelLeft.vue'
import PanelRight from './containers/PanelRight.vue'
// import eventbus from '../assets/EventBus'
import History from './containers/History.vue'
import G6 from './global/g6/index.js'
// import obj from '../global/g6/node/index'
// import G6 from '@antv/g6'
import utils from './global/g6/utils'
import * as G6Util from '@antv/util'
export default {
  name: 'MainEdiotr',
  components: {
    ToolBar,
    Sketchpad,
    PanelLeft,
    PanelRight,
    History
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
      const _t = this
      _t.editorInfo = {
        ..._t.defInfo,
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
      const { toolList, shortcutMap } = _t.$X.config.tools
      console.log(toolList, 'toolList')
      console.log('存储', _t.$X.config.storage.prefix)

      const materials = _t.$X.config.materials
      _t.shortcutMap = shortcutMap
      _t.materialList = materials
      _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
      _t.$X.utils.storage.set('shortcutMap', shortcutMap, _t.$X.config.storage.prefix)
      _t.$X.utils.storage.set('materials', materials, _t.$X.config.storage.prefix)
      console.log(materials[0].children, 'materials')
      // _t.materialsList = materials
      _t.$X.utils.storage.set('log', {
        current: null,
        list: []
      }, _t.$X.config.storage.prefix)
      const el = _t.$el
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
      _t.graph.$D = {
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
      _t.graph.setMode('edit')
      // 在写一下函数之后才能够放大或者缩小图形 即点击事件有响应
      _t.graph.on('canvas:mousedown', _t.canvasMousedown)
      // 绑定事件
      _t.graph.on('node:mousedown', _t.nodeMousedown)
      _t.graph.on('node:mouseover', _t.nodeHover)
      _t.graph.on('node:mouseout', _t.nodeOut)
      _t.graph.on('edge:mousedown', _t.edgeMousedown)
      _t.graph.on('editor:getItem', function (data) {
        _t.currentItem = data
      })
      this.graph.on('editor:setItem', function (data) {
        console.log(data, '小日本')
        data.forEach((item, index) => {
          const model = item.model
          // if (item.type === 'edge') {
          //   TODO 处理箭头
          // }
          const shapeItem = _t.graph.findById(item.id)
          if (!index) {
            // 更新第一个节点
            _t.graph.updateItem(shapeItem, model)
          } else {
            // FIXME 更新同组节点，只更新样式部分
            _t.editor.updateItem(shapeItem, {
              style: data[0].model.style
            })
          }
        })
        _t.graph.paint()
      })
      _t.graph.on('editor:record', function (from) {
        // 更新操作日志
        console.log('editor:record from', from)
        _t.updateLog({
          action: 'record',
          data: {
            time: new Date(),
            content: _t.graph.save()
          }
        })
      })
    },
    canvasMousedown() {
      const _t = this
      _t.doClearAllStates()
      // 更新currentItem
      _t.currentItem = []
    },
    nodeMousedown(event) {
      const _t = this
      _t.doClearAllStates()
      _t.graph.setItemState(event.item, 'active', true)
    },
    nodeHover(event) {
      const _t = this
      // FIXME 当节点未激活时才可设置hover true状态
      if (!event.item.hasState('active')) {
        _t.graph.setItemState(event.item, 'hover', true)
      }
    },
    nodeOut(event) {
      const _t = this
      _t.graph.setItemState(event.item, 'hover', false)
    },
    edgeMousedown(event) {
      const _t = this
      _t.doClearAllStates()
      // console.log('_edgeMousedown', event)
      if (event.item && !event.item.destroyed) {
        _t.graph.setItemState(event.item, 'active', !event.item.hasState('active'))
      }
    },
    doClearAllStates() {
      const _t = this
      if (!_t.graph) {
        return
      }
      // 批量操作时关闭自动重绘，以提升性能
      _t.graph.setAutoPaint(false)
      _t.graph.getNodes().forEach(function (node) {
        _t.graph.clearItemStates(node, ['active', 'hover', 'selected'])
      })
      _t.graph.getEdges().forEach(function (edge) {
        _t.graph.clearItemStates(edge, ['active', 'hover', 'selected'])
      })
      _t.graph.paint()
      _t.graph.setAutoPaint(true)
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
        const width = _t.graph.get('width')
        const height = _t.graph.get('height')
        center = {
          x: width / 2,
          y: height / 2
        }
      }
      // if (info.name === 'zoom') {
      //   _t.graph.zoomTo(info.data, center)
      // } else
      if (['Fangda', 'Suoxiao'].includes(info.name)) {
        const currentRatio = _t.graph.getZoom()
        const step = 0.1
        ratio = info.name === 'Suoxiao' ? currentRatio - step : currentRatio + step
        ratio = ratio.toFixed(1)
        // 缩放视窗窗口到一个固定比例
        _t.graph.zoomTo(ratio, center)
        // 处理选中，更新toolList
        const toolList = []
        const toolListData = _t.$X.utils.storage.get('toolList', _t.$X.config.storage.prefix)
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
          _t.toolList = toolList
          _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
        }
      } else if (info.name === 'actualSize') {
        ratio = 1
        _t.graph.zoomTo(ratio, center)
      }
    },
    handleToolTrigger(info) {
      const _t = this
      let isRecord = false
      switch (info.name) {
        // 撤销
        case 'chexiao':
        // 清空日志
        case 'clear': {
          // 更新操作日志
          _t.updateLog({
            action: info.name
          })
          if (['chexiao'].includes(info.name)) {
            const log = _t.$X.utils.storage.get('log', _t.$X.config.storage.prefix)
            console.log(log, 'kog')
            _t.$nextTick(function () {
              if (log.list.length) {
                if (log.current === 0) {
                  const data = log.list[0]
                  if (data === null) {
                    // 清除
                    _t.graph.clear()
                    _t.graph.paint()
                  } else {
                    // 渲染
                    _t.graph.read(data.content)
                    _t.graph.paint()
                    // 缩放到实际大小
                    _t.doZoom({
                      name: 'actualSize'
                    })
                  }
                } else {
                  const data = log.list[log.current]
                  // 渲染
                  _t.graph.read(data.content)
                  _t.graph.paint()
                  // 缩放到实际大小
                  _t.doZoom({
                    name: 'actualSize'
                  })
                }
              }
            })
            // 更新currentItem
            _t.currentItem = []
          }
          break
        }
        // 删除逻辑
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
            _t.graph.removeItem(node)
          })
          _t.graph.getEdges().forEach(edge => {
            if (edge.hasState('active')) {
              isRecord = true
              _t.graph.removeItem(edge)
            }
          })
          _t.currentItem = []
          break
        }
        // 历史记录
        case 'history': {
          const ref = _t.$refs[info.name]
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
              _t.graph.updateItem(node, {
                style: {
                  ...style,
                  fill: info.data
                }
              })
            }
          })
          break
        }
        // 放大
        case 'Fangda':
        case 'Suoxiao':
        case 'actualSize': {
          _t.doZoom(info)
          break
        }
        // 下载
        case 'Download': {
          console.log("Download 了了了")
          const fileName = _t.$X.utils.filters.formatDate(new Date(), 'YYYYMMDDhhmmss')
          console.log(fileName, 'FileName的')
          console.log(info, 'info.data')
          if (info.data === 'image') {
            _t.graph.downloadImage(fileName)
          } else if (info.data === 'json') {
            let content = _t.graph.save()
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
      }
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
      const oldLog = JSON.parse(JSON.stringify(_t.$X.utils.storage.get('log', _t.$X.config.storage.prefix)))
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
            if (_t.maxLogSize !== null && oldLog.list.length > _t.maxLogSize) {
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
              if (_t.maxLogSize !== null && oldLog.list.length > _t.maxLogSize) {
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
      _t.$X.utils.storage.set('log', log, _t.$X.config.storage.prefix)
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
