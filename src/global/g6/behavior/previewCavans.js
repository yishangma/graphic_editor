// 预览画布交互
export default {
  name: 'preview-cavans',
  options: {
    getDefaultCfg() {
      return {
        config: {}
      }
    },
    getEvents() {
      return {
        'node:contextmenu': 'onNodeContextmenu',
        'canvas:contextmenu': 'onCanvasContextmenu',
        'edge:contextmenu': 'onEdgeContextmenu'
      }
    },
    onNodeContextmenu(event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'node',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onCanvasContextmenu(event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'canvas',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onEdgeContextmenu(event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'edge',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    }
  }
}
