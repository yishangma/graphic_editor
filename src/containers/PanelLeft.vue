<template>
  <div class="panel-left">
    <div class="header"></div>
    <div class="body">
      <!-- 第一个下拉菜单 -->
      <div class="body-first"  ref="firstNormal">
        <div class="body-first-header" @click="clickfirst">
            <div class="title-first">一般图形</div>
            <div class="handler1">
              <Icon class="icon-down1" type="ios-arrow-down" v-if="!isFoldfirst"></Icon>
              <Icon class="icon-down1" type="ios-arrow-up" v-if="isFoldfirst"></Icon>
            </div>
        </div>
        <div class="normalBox" v-if="isFoldfirst">
        <NodeElement class="nodeElement"  v-for="normal in NormalBoxList" :title="normal.label" :key="normal.type" :info="normal"></NodeElement>
        </div>
      </div>
      <!-- 第二个下拉菜单 -->
      <div class="body-second" >
        <div class="body-second-header" @click="clicksecond">
          <div class="title-second">箭头图形</div>
          <div class="handler2">
            <Icon class="icon-down2" type="ios-arrow-down" v-if="!isFoldsecond"></Icon>
            <Icon class="icon-down2" type="ios-arrow-up" v-if="isFoldsecond"></Icon>
          </div>
        </div>
        <div class="normalBox" v-if="isFoldsecond">
        <NodeElement class="nodeElement" v-for="arrow in ArrowBoxList" :title="arrow.label" :key="arrow.type" :info="arrow"></NodeElement>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import materials, * as defMaterials from '../config/materials'
import eventbus from '../assets/EventBus'
// import materials from '../config/materials'
// 节点组件
import NodeElement from '../components/NodeElement.vue'
export default {
  name: 'PanelLeft',
  components: {
    NodeElement
  },
  props: {
     normal: {
       type: Object,
        default () {
          return {
            width: 40,
            height: 40,
            svg: ''
          }
        }
      }
  },
  mounted () {
  },
  data () {
    return {
      child: 0,
      isFoldfirst: false,
      isFoldsecond: false,
      NormalBoxList: this.$X.config.materials[0].children,
      ArrowBoxList: this.$X.config.materials[1].children
    }
  },
  methods: {
    clickfirst () {
      this.isFoldfirst = !this.isFoldfirst
    },
    clicksecond () {
      this.isFoldsecond = !this.isFoldsecond
    },
    onMouseDown (e) {
      // console.log('mouse', this.normal)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.panel-left{
  float:left;
  height:100%;
  left:0px;
  width:16.3%;
  background-color: #fff;
  overflow:scroll;
  .header{
    height:47px;
  }
  .body{
    width:100%;
    height:100%;
    display: inline-block;
    .body-first{
      font-size:13px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      .body-first-header{
        display: flex;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        .title-first{
          flex:2;
          height:35px;
          text-indent:10px;
          line-height:35px;
          font-weight:bold;
        }
        .handler1{
          flex:1;
          .icon-down1{
            height:35px;
            line-height:35px;
            text-indent:60px;// 这里之所以选择text-indent 是因为它继承了父元素的left：0 但是那个left是不好改的 所以选择这种方式移动到右边
          }
        }
      }
      .body-first-header:hover{
        background:rgba(0,0,0,.1);
      }
    }
    .body-second{
      font-size:13px;
      border-bottom:1px solid rgba(0,0,0,.1);
      .body-second-header{
        display: flex;
        border-bottom:1px solid rgba(0,0,0,.1);
        .title-second{
          flex:2;
          height:35px;
          text-indent:10px;
          line-height:35px;
          font-weight:bold;
        }
        .handler2{
          flex:1;
          .icon-down2{
            height:35px;
            line-height:35px;
            text-indent:60px;
          }
        }
      }
      .body-second-header:hover{
      background:rgba(0,0,0,.1)
      }
    }
  }
}
.normalBox{
  height:300px;
  display: grid;
  grid-template-columns: auto auto auto auto;
}
</style>
