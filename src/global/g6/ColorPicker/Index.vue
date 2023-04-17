<!-- 颜色选择器组件-->
<template>
  <div class="color-box" v-show="showPanel">
    <div class="color-item" >
      <sketch-picker class="sketchpicker"  :value="color" @input="handlechange" :presetColors="presetColors"></sketch-picker>
      <div class="btn-box">
        <Button class="btn" type="default" size="small" @click="close">关闭</Button>
        <Button class="btn" type="primary" size="small" @click="comfirm">确认</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    'sketch-picker': Sketch
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    presetColors: {
      type: Array,
      default: () => [
        '#2d8cf0',
        '#19be6b',
        '#ff9900',
        '#ed4014',
        '#00b5ff',
        '#19c919',
        '#f9e31c',
        '#ea1a1a',
        '#9b1dea',
        '#00c2b1',
        '#ac7a33',
        '#1d35ea',
        '#8bc34a',
        '#f16b62',
        '#ea4ca3',
        '#0d94aa',
        '#febd79',
        '#5d4037',
        '#00bcd4',
        '#f06292',
        '#cddc39'
        // '#607d8b',
        // '#000000',
        // '#ffffff'
      ]
    }
  },
  data () {
    return {
      showPanel: true,
      color: ''
    }
  },
  watch: {
    value (val) {
      this.color = val
    }
  },
  methods: {
    close () {
      this.showPanel = !this.showPanel
      // this.showPanel = true
    },
    handlechange (val) {
      this.color = typeof val === 'object' && Object.prototype.hasOwnProperty.call(val, 'hex8') ? val.hex8 : ''
      this.$emit('input', this.color)
    },
    comfirm () {
      console.log(this.color)
      this.$emit('on-change', this.color)
      this.close()
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.color-box{
  display:flex;
  flex-wrap:wrap;
  text-align:center;
  position:relative;
  .color-item{
  position:absolute;
  background:#ffffff;
  box-shadow:0 0 2px 2px rgba(0,0,0,.1);
  margin-top:1px;
  margin-left:-30px;
  .sketchpicker{
    border:none;
    box-shadow:none;
    height:375px;
    width:197px;
  }
  .btn-box{
    text-align:right;
    z-index:10;
    padding:10px;
    border-top:1px solid #eee;
    .btn{
      font-size:13px;
      &+.btn{
        margin-left:10px;
      }
    }
  }
  }
}
</style>
