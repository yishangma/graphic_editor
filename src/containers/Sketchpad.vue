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
        const boxStyle = {}
        console.log(this.panelStyle, 'this.panelStyle')
        const keys = Object.keys(this.panelStyle)
        keys.forEach(key => {
          const panelStyle = this.panelStyle[key]
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
