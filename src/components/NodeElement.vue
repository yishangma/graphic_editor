<template>
  <div class="node-element" :style="elementStyle" @mousedown="handleMouseDown">
    <div class="content" :title="title">
      <svg class="icon" v-html="info.icon"></svg>
    </div>
  </div>
</template>

<script>
// import eventbus from '../assets/EventBus'
// import obj from '../global/g6/node/index'
export default {
  name: 'NodeElement',
  props: {
    title: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true,
      default() {
        return {
          type: 'circle',
          label: 'circle',
          width: 40,
          height: 40,
          anchorPoints: [[0, 0], [0, 1], [1, 0], [1, 1]],
          svg: ''
        }
      }
    },
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 40
    }
  },
  computed: {
    elementStyle() {
      const _t = this
      const style = {}
      if (this.width) {
        style.width = this.width + 'px'
      }
      if (this.height) {
        style.height = this.height + 'px'
      }
      return style
    }
  },
  methods: {
    handleMouseDown() {
      const _t = this
      this.$X.utils.eventbus.$emit('editor/add/node', this.info)
      console.log(this.info, 'this.info')
      // console.log(obj)
      // console.log(Object.values(obj))
      // obj.
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.node-element {
  display: inline-block;
  margin: 2px;
  border: 1px solid transparent;

  &:hover {
    border-color: rgba(0, 0, 0, .1);
    cursor: move;
  }

  .content {
    display: inline-block;
    width: 100%;
    height: 100%;
    // margin:auto;
    text-align: center;

    .icon {
      left: 1px;
      top: 1px;
      width: 32px;
      height: 30px;
      display: block;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
    }
  }
}
</style>
