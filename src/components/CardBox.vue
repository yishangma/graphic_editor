/**
* CardBox 卡片盒子
*/

<template>
  <div class="card-box" :style="boxStyle">
  <!-- <Handler
          class="handler"
          :mode="mode"
                  :position="position"
                  :expand="isExpand"
                  :callback="toggleHandler"
                >
                </Handler> -->
    <div class="card-header">
      <slot name="header">
        <div class="title">{{ title }}</div>
      </slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import Handler from './Handler'

export default {
  name: 'CardBox',
  components: {
    // Handler
  },
  props: {
    width: {
      type: Number,
      default: 300
    },
    // 显示位置
    placement: {
      type: String,
      default: 'right'
    },
    // handler 模式
    mode: {
      type: String,
      validator(value) {
        return ['horizontal', 'vertical'].includes(value)
      },
      default: 'vertical'
    },
    // handler 相对目标元素位置关系
    position: {
      type: String,
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      },
      default: 'right'
    },
    title: String
  },
  data() {
    return {
      // 是否展开
      isExpand: true
    }
  },
  computed: {
    boxStyle() {
      const _t = this
      const style = {}
      if (this.placement) {
        style[this.placement] = 0
      }
      if (this.width) {
        style.width = this.width + 'px'
      }
      // 处理展开
      if (this.isExpand) {
        style[this.placement] = 0
      } else {
        style[this.placement] = (-this.width) + 'px'
      }
      this.$emit('expand', {
        name: this.placement,
        isExpand: this.isExpand,
        style: style
      })
      return style
    }
  },
  methods: {
    toggleHandler(val) {
      const _t = this
      this.isExpand = val !== undefined ? val : !this.isExpand
    }
  },
  created() {
    const _t = this
    this.$X.utils.eventbus.$on('editor/pad/dblclick', this.toggleHandler)
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.card-box {
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  /*padding-top: 40px;*/
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
  background: #ffffff;
  z-index: 200;
  transition: all .5s ease-in-out;

  .card-header {
    display: inline-block;
    width: 100%;
    height: 40px;

    .title {
      height: 40px;
      line-height: 40px;
      text-indent: 10px;
      font-size: 13px;
      font-weight: bolder;
      color: #000;
    }
  }

  .card-body {
    position: absolute;
    top: 40px;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0;
    z-index: 2000;
    background: #fff;
    text-align: left;
    overflow-y: auto;
  }
}
</style>
