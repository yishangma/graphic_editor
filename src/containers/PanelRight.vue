<template>
  <CardBox v-if="isShowPanel" title="" style="width:23.4%" @expand="toggleHandler">
    <CardItem v-if="isShowOptions" title="配置器" :enableFold="true" :bold="true">
      <Options :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"></Options>
    </CardItem>
  </CardBox>
</template>

<script>
import CardBox from '../components/CardBox'
import CardItem from '../components/CardItem'
import Options from '../components/Options'
export default {
  name: 'PanelRight',
  props: {
    currentItem: Array,
    toolList: Array,
    editorConfig: Object
  },
  components: {
    CardBox,
    CardItem,
    Options
  },
  computed: {
    infoPanel() {
      return this.$X.config.infoPanel
    },
    isShowOptions() {
      return this.infoPanel.options.enable
    },
    isShowPanel() {
      return this.isShowOptions
    }
  },
  methods: {
    toggleHandler(data) {
      // const _t = this
      // console.log(this.currentItem, '99999999999999999999')
      this.$X.utils.eventbus.$emit('editor/panel/toggle', data)
    }
  }

}
</script>

<style scoped lang="less" rel="stylesheet/less">
// .panel-right {
//   float: right;
//   height: 100%;
//   right: 0px;
//   width: 23.4%;
//   overflow: scroll;

//   // background-color: orange;
//   .header {
//     height: 40px;
//   }

//   .body {
//     width: 100%;
//     height: 100%;

//     .body-container {
//       display: flex;
//       height: 35px;
//       font-size: 13px;
//       border-bottom: 1px solid rgba(0, 0, 0, .1);

//       .container-title {
//         flex: 3;
//         height: 35px;
//         text-indent: 10px;
//         line-height: 35px;
//         font-weight: bold;
//       }

//       .handler {
//         flex: 1;

//         .icon-down {
//           height: 35px;
//           line-height: 35px;
//           text-indent: 80px;
//         }
//       }
//     }

//     .body-container:hover {
//       background: rgba(0, 0, 0, .1)
//     }

//     .body-item-first {
//       display: flex;
//       height: 35px;
//       font-size: 10px;
//       border-bottom: 1px solid rgba(0, 0, 0, .1);

//       .item-first {
//         flex: 3;
//         height: 35px;
//         text-indent: 10px;
//         line-height: 35px;
//       }
//     }

//     .body-item-first:hover {
//       background: rgba(0, 0, 0, .1)
//     }
//   }
// }

// .form-item-block {
//   padding: 10px 20px;

//   .row {
//     display: flex;
//     font-size: 13px;
//     align-items: center;
//     align-content: center;
//     justify-content: space-between;

//     &.row-start {
//       justify-content: flex-start;
//     }

//     .col {
//       display: flex;
//       align-items: center;
//       align-content: center;
//       justify-content: center;
//       width: auto;
//       line-height: 1;
//     }
//   }
// }

// .color-preview {
//   display: inline-block;
//   vertical-align: middle;
//   width: 20px;
//   height: 20px;
//   background: transparent;
//   border: 1px solid #cccccc;
//   margin-right: 3px;
// }

// // ivew的label默认是无法修改的  所以这里用样式穿透 强制修改字体大小
// #font-size /deep/ .ivu-form-item-label {
//   font-size: 10px;
// }

// #font-size /deep/ .input-number {
//   font-size: 10px;
// }

// #font-size /deep/ .ivu-select-selected-value {
//   font-size: 10px;
// }

// .optionColorPicker {
//   margin-right: 10px;
// }

// .colorpicker-item {
//   position: relative;

//   .colorpicker-item {
//     position: absolute;
//   }
// }

// .text {
//   height: 1200px;
//   background-color: aquamarine;
// }
</style>
