<template>
  <div class="sketchpad-box" :style="boxStyle">
    <div class="sketchpad" id="sketchpad" ref='init'>
       <input class="inputBox" autofocus value="">
    </div>
  </div>
</template>

<script>
export default {

  name: 'SketchPad',
  components: {

  },
  data () {
    return {
      panelStyle: {
        left: null,
        right: null
      }
    }
  },
  computed: {
    boxStyle () {
        const _t = this
        const boxStyle = {}
        console.log(this.panelStyle, 'this.panelStyle')
        const keys = Object.keys(_t.panelStyle)
        keys.forEach(key => {
          const panelStyle = _t.panelStyle[key]
          if (panelStyle) {
            // 位置数据
            const positionVal = isNaN(parseInt(panelStyle[key])) ? 0 : parseInt(panelStyle[key])
            const width = isNaN(parseInt(panelStyle.width)) ? 0 : parseInt(panelStyle.width)
            boxStyle[key] = positionVal + width + 'px'
          }
        })
        console.log(boxStyle, 'boxStyle')
        return boxStyle
      }
  }
  // created () {
  //   const _t = this
  //   _t.initInfo()
  //   _t.$X.utils.eventbus.$on('editor/add/node', _t.doAddNode)
  //   _t.$X.utils.eventbus.$on('editor/tool/trigger', _t.handleToolTrigger)
    // _t.$X.utils.storage.set('log', {
    //     current: null,
    //     list: []
    //   }, _t.$X.config.storage.prefix)
  // },
  // mounted () {
  //   this.createGraph()
  // },
  // beforeDestroy () {
  //   this.graph.destroy()
  // },
  // methods: {
  //   initInfo(data = {}) {
  //     const _t = this
  //       _t.editorInfo = {
  //         ..._t.defInfo,
  //         ...data
  //       }
  //   },
  //   doAddNode (info) {
  //     console.log(info, 'daAddNode')
  //     const node = {
  //       id: G6Util.uniqueId(),
  //       draggable: true,
  //       type: info.type,
  //       label: info.defaultLabel,
  //       labelCfg: {
  //         position: 'center',
  //         style: {
  //           fontSize: 16,
  //           stroke: '#000000'
  //         }
  //       },
  //       width: info.width,
  //       height: info.height,
  //       minWidth: info.minWidth,
  //       minHeight: info.minHeight,
  //       // 匹配自定义锚点
  //       anchorPoints: info.anchorPoints,
  //       // 定义shapeControl
  //       shapeControl: info.shapeControl
  //     }
  //     this.graph.emit('graph:addNode', node)
  //   },
  //   // 这是第三次创建画布 最终的样式效果
  //   createGraph () {
  //     const _t = this
  //     // this.registerNode()
  //     const grid = new G6.Grid()
  //     this.graph = new G6.Graph({
  //       container: document.getElementById('sketchpad'),
  //       width: this.$refs.init.offsetWidth, // 获取的是父盒子sketch的高度和宽度
  //       height: this.$refs.init.offsetHeight,
  //       fitView: true,
  //       fitViewPadding: 20,
  //       autoPaint: true,
  //       modes: {
  //         edit: [
  //           {
  //             type: 'node-control',
  //             config: {
  //               shapeControlPoint: {
  //                   // 是否在缩放、旋转节点时更新所有与之相连的边
  //                   updateEdge: false
  //                 },
  //                 dragNode: {
  //                   // 是否在拖拽节点时更新所有与之相连的边
  //                   updateEdge: false
  //                 },
  //                 // 是否支持在节点上添加文本
  //                 nodeLabel: true,
  //                 // 是否支持在边上添加文本
  //                 edgeLabel: true,
  //                 // tooltip 是否启用
  //                 tooltip: {
  //                   shapeControl: true,
  //                   dragNode: true,
  //                   dragEdge: true
  //                 },
  //                 // 是否启用对齐线
  //                 alignLine: {
  //                   enable: false,
  //                   style: {
  //                     stroke: '#FFA500',
  //                     lineWidth: 1
  //                   }
  //                 }
  //             }
  //           }
  //         ],
  //         preview: [
  //           'zoom-canvas',
  //           'drag-canvas',
  //           'preview-canvas'
  //         ]
  //       },
  //       groupType: 'rect',
  //         groupStyle: {
  //           default: {
  //             lineWidth: 1,
  //             stroke: '#29B6F2',
  //             strokeOpacity: 1,
  //             fill: '#29B6F2',
  //             fillOpacity: 0.1,
  //             opacity: 1,
  //             minDis: 0,
  //             maxDis: 0
  //           }
  //         },
  //       plugins: [grid]
  //     })
  //     _t.graph.$D = {
  //         fill: '#FFFFFF',
  //         fillOpacity: 1,
  //         lineColor: '#000000',
  //         strokeOpacity: 1,
  //         lineWidth: 1,
  //         lineType: 'x-line',
  //         lineDash: 'solid',
  //         startArrow: false,
  //         endArrow: false,
  //         lineAppendWidth: 10,
  //         autoRotate: true
  //       }
  //     _t.graph.setMode('edit')
  //     // 在写一下函数之后才能够放大或者缩小图形 即点击事件有响应
  //     _t.graph.on('canvas:mousedown', _t.canvasMousedown)
  //       // 绑定事件
  //       _t.graph.on('node:mousedown', _t.nodeMousedown)
  //       _t.graph.on('node:mouseover', _t.nodeHover)
  //       _t.graph.on('node:mouseout', _t.nodeOut)
  //       _t.graph.on('edge:mousedown', _t.edgeMousedown)
  //       _t.graph.on('editor:getItem', function (data) {
  //         _t.currentItem = data
  //       })
  //   },
  //   canvasMousedown () {
  //       const _t = this
  //       _t.doClearAllStates()
  //       // 更新currentItem
  //       _t.currentItem = []
  //     },
  //     nodeMousedown (event) {
  //       const _t = this
  //       _t.doClearAllStates()
  //       _t.graph.setItemState(event.item, 'active', true)
  //     },
  //     nodeHover (event) {
  //       const _t = this
  //       // FIXME 当节点未激活时才可设置hover true状态
  //       if (!event.item.hasState('active')) {
  //         _t.graph.setItemState(event.item, 'hover', true)
  //       }
  //     },
  //     nodeOut (event) {
  //       const _t = this
  //       _t.graph.setItemState(event.item, 'hover', false)
  //     },
  //     edgeMousedown (event) {
  //       const _t = this
  //       _t.doClearAllStates()
  //       // console.log('_edgeMousedown', event)
  //       if (event.item && !event.item.destroyed) {
  //         _t.graph.setItemState(event.item, 'active', !event.item.hasState('active'))
  //       }
  //     },
  //     doClearAllStates () {
  //       const _t = this
  //       if (!_t.graph) {
  //         return
  //       }
  //       // 批量操作时关闭自动重绘，以提升性能
  //       _t.graph.setAutoPaint(false)
  //       _t.graph.getNodes().forEach(function (node) {
  //         _t.graph.clearItemStates(node, ['active', 'hover', 'selected'])
  //       })
  //       _t.graph.getEdges().forEach(function (edge) {
  //         _t.graph.clearItemStates(edge, ['active', 'hover', 'selected'])
  //       })
  //       _t.graph.paint()
  //       _t.graph.setAutoPaint(true)
  //     },
  //     handleToolTrigger (info) {
  //       const _t = this
  //       let isRecord = false
  //       switch (info.name) {
  //         // 撤销
  //         case 'chexiao':break
  //           // 清空日志
  //         case 'clear': {
  //           break
  //         }
  //         // 删除逻辑
  //         case 'delete': {
  //           const nodes = []
  //           // 获取画板中的node节点 forEach遍历 把所有的node节点放入nodes数组中，之后选择node在removeItem
  //           this.graph.getNodes().forEach(node => {
  //             if (node.hasState('active')) {
  //               isRecord = true
  //               nodes.push(node)
  //             }
  //           })
  //           nodes.forEach(node => {
  //             _t.graph.removeItem(node)
  //           })
  //           _t.graph.getEdges().forEach(edge => {
  //             if (edge.hasState('active')) {
  //               isRecord = true
  //               _t.graph.removeItem(edge)
  //             }
  //           })
  //           _t.currentItem = []
  //           break
  //         }
  //         case 'history': {
  //           const ref = _t.$refs[info.name]
  //           if (ref && ref.show) {
  //             ref.show()
  //           }
  //           break
  //         }
  //         // 填充颜色
  //         case 'backgroundColor': {
  //           this.graph.$D.fill = info.data
  //           this.graph.getNodes().forEach(node => {
  //             if (node.hasState('active')) {
  //               isRecord = true
  //               const { style } = node.getModel()
  //               _t.editor.updateItem(node, {
  //                 style: {
  //                   ...style,
  //                   fill: info.data
  //                 }
  //               })
  //             }
  //           })
  //           break
  //         }
  //       }
  //     },
  //     doRevert(data) {
  //       if (!data) {
  //         return
  //       }
  //       // 清空画布
  //       this.graph.clear()
  //       this.currentItem = []
  //       this.graph.data(data)
  //       this.graph.render()
  //       this.editor.getNodes().forEach(node => {
  //         const model = node.getModel()
  //         const radian = model.radian
  //         const keyShape = node.getKeyShape()
  //         keyShape.resetMatrix()
  //         keyShape.rotate(radian)
  //         const group = this.editor.get('group')
  //         // 更新shapeControl
  //         utils.shapeControl.rotate(model, group, radian)
  //         // 更新锚点
  //         utils.anchor.rotate(model, group, radian)
  //       })
  //     }
  // }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.sketchpad-box{
  overflow:auto;
  position:absolute;
  left:16.3%;
  width:60.3%;
  top:0;
  bottom:0;
  justify-content: center;
  .sketchpad{
    width:95%;
    height:1200px;
    position:absolute;
    margin-left:23px;
    margin-top:100px;
    margin-bottom:100px;
    z-index:100;
    background:#FFFFFF;
    box-shadow: 0 0 2px 2px rgba(0,0,0,.1)
  }
}
.inputBox{
  display:none;
}
</style>
