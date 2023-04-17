<!-- 修改记录
2月24日：用多个div来设置渲染导航栏
2月25日：用v-for结合v-if来优化 减少代码量 -->
<template>
  <div class="tool-bar">
    <div class="tool-box-left">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="tool-box-center">
      <div class="tool-bar-center">
      </div>
      <div class="tool-bar-left" v-for="(item, typeIndex) in toolList" :key="typeIndex">
      <div class="tool-item" v-if="item.type === 'icon-beijingyanse'">
        <div class="icon" :title="item.title">
          <!-- <div class="tool-buju" @click="showColorPicker">
                            <div :class="item.type" class="iconfont"  ></div>
                            <Icon class="icon-down" type="ios-arrow-down" />
                          </div> -->
            <ColorPicker v-model="formData[item.name]" v-show="isshowColorPicker" class="BarColorPicker"
              @on-change="(val) => handleToolClick(item, val, null)">
              <div class="tool-buju" slot="preview">
                <div :class="item.type" class="iconfont"></div>
                <Icon class="icon-down" type="ios-arrow-down" />
              </div>
            </ColorPicker>
          </div>
        </div>
        <div class="tool-item" v-else-if="item.type === 'icon-zhixian'">
          <div class="icon" :title="item.title">
            <div class="tool-buju" @click="showLineBox">
              <div :class="item.type" class="iconfont"></div>
              <Icon class="icon-down" type="ios-arrow-down" />
            </div>
          </div>
          <LineBox v-show="isshowLineBox" class="linebox"></LineBox>
        </div>
        <div class="tool-item" v-else @click="handleToolClick(item)">
          <div class="icon" :title="item.title">
            <div :class="item.type" class="iconfont"></div>
          </div>
        </div>
      </div>
      <div class="tool-bar-right">
      </div>
    </div>
    <div class="tool-box-right">
      <div class="tool-itm">
        <screenfull class="screenfull" @click="isScreenFull">
          <div class="icon quanpin" title='全屏展示'>
            <div class="iconfont icon-quanping allshow"></div>
          </div>
        </screenfull>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '../global/ColorPicker/Index.vue'
import screenfull from 'screenfull'
import LineBox from '../global/LineBox/Index.vue'
import TOOL from '../config/tools'
export default {
  name: 'ToolBar',
  components: {
    ColorPicker,
    LineBox,
    screenfull
  },
  props: {
    editorData: Object
  },
  data() {
    return {
      formData: this.editorData ? { ...this.editorData } : {},
      isFullscreen: false,
      isshowColorPicker: true,
      isshowLineBox: false,
      toolList: [
        { type: 'icon-back', title: '撤销', name: 'chexiao' },
        { type: 'icon-rizhi', title: '清空日志', name: 'clear' },
        { type: 'icon-ashbin', title: '删除', name: 'delete' },
        { type: 'icon-history', title: '历史记录', name: 'history' },
        { type: 'icon-beijingyanse', title: '背景颜色', name: 'backgroundColor' },
        { type: 'icon-zhixian', title: '线条类型', name: 'LineType' },
        { type: 'icon-zoom-out', title: '放大', name: 'Fangda' },
        { type: 'icon-zoom-in', title: '缩小', name: 'Suoxiao' },
        { type: 'icon-download', title: '下载', name: 'Download', data: 'image' }
      ]
    }
  },
  methods: {
    showColorPicker() {
      this.isshowColorPicker = !this.isshowColorPicker
    },
    // 全屏显示函数
    isScreenFull() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器版本过低不支持全屏显示',
          type: 'wraning'
        })
        return false
      }
      screenfull.toggle()
    },
    showLineBox() {
      this.isshowLineBox = !this.isshowLineBox
    },
    handleToolClick(item, val) {
      // console.log('handlajandin', item.name)
      const _t = this
      let playLoad = {
        name: item.name
      }
      switch (item.name) {
        case 'backgroundColor':
          this.formData[item.name] = val
          playLoad = {
            ...playLoad,
            data: val
          }
          break
      }
      _t.$X.utils.eventbus.$emit('editor/tool/trigger', playLoad)
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet/less">
Button {
  height: 40px;
}

.tool-bar {
  display: flex;
  flex-wrap: nowrap; //决定容器类项目是否可以换行，此时不可以
  justify-content: flex-start; //定义项目在主轴上对齐的方式为左对齐
  align-content: flex-start; //定义项目在交叉轴上的对齐方式为元素不会拉伸，沿交叉轴起边对齐
  width: 100%;
  height: 40px;
  padding: 0 20px; //内边距
  position: fixed; //固定定位
  top: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
  z-index: 500; //设置元素的堆叠顺序
  transition: all .5s ease-in-out;
  display: tabel-cell;
  vertical-align: middle;
  cursor: pointer; //悬浮时变手指

  .tool-box-left {
    flex: 1;

    img {
      text-align: left;
      width: 75px;
      height: 34.5px;
    }
  }

  .tool-box-center {
    flex: 5;
    height: 40px;
    line-height: 40px;
    vertical-align: center;
    text-align: center;
    display: flex;

    .tool-item {
      display: inline-block;

      .icon {
        // margin-left:10px;
        width: 40px;
        height: auto;
        filter: alpha(Opacity=60);
        opacity: 0.6;

        .BarColorPicker {
          margin-left: -30px;
        }

        // .linebox{
        //   margin-left:-10px;
        // }
      }

      .icon:hover {
        filter: alpha(Opacity=100);
        opacity: 1;
      }

      .tool-buju {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .icon-down {
        line-height: 40px;
        font-size: 14px;
      }
    }

    .tool-bar-left {
      flex: 1;
    }

    .tool-bar-center {
      flex: 1;
    }

    .tool-bar-right {
      flex: 1;
    }

    .tool-bar-fanal {
      flex: 1;
    }
  }

  .tool-box-right {
    flex: 1;
    height: 40px;
    line-height: 40px;
    vertical-align: center;
    text-align: center;

    .quanpin {
      right: 0;

      .allshow {
        filter: alpha(Opacity=60);
        opacity: 0.5;
      }

      .allshow:hover {
        filter: alpha(Opacity=100);
        opacity: 1;
        color: blue;
      }
    }
  }
}
</style>
