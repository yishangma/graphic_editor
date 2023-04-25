<template>
  <div class="tool-bar">
    <template v-for="(type, typeIndex) in Object.keys(toolMap)">
      <ToolBox mode="horizontal" :key="typeIndex" :class="type">
        <template v-for="(item, index) in toolMap[type]">
          <!-- 颜色选择器 背景颜色 -->
          <ToolItem v-if="item.type === 'dropdown-color-picker'" :key="'tool_' + type + '_item_' + index"
            :active="item.active" :disabled="item.disabled" :style="item.toolbar.style" :title="item.title">
            <template v-slot:label>
              <template v-if="item.disabled">
                <ColorPicker v-model="formData[item.name]" @on-change="(val) => handleToolClick(item, val, null)">
                  <div style="margin:0 3px;" slot="preview">
                    <XIcon :iconfont="item.icon" style="vertical-align:middle"></XIcon>
                    <Icon class="icon-down" type="ios-arrow-down" />
                  </div>
                </ColorPicker>
              </template>
            </template>
          </ToolItem>
          <!-- 包括删除 撤销 历史记录等 -->
          <ToolItem v-if="item.type === 'normal' && item.showing" :key="'tool_' + type + '_item_' + index"
            :title="item.title" :active="item.active" :disabled="item.disabled" :style="item.toolbar.style"
            @click.native="handleToolClick(item)">
            <template v-slot:label>
              <XIcon :iconfont="item.icon" :label="item.title"></XIcon>
            </template>
          </ToolItem>
          <!-- 包括下载 线条类型 -->
          <ToolItem v-if="item.type === 'dropdown-list'" :key="'tool_' + type + '_item_' + index" :active="item.active"
            :disabled="item.disabled" :style="item.toolbar.style" :title="item.title">
            <template v-slot:label>
              <template v-if="item.disable">
                <template v-if="item.lockLabel">
                  <XIcon :iconfont="item.icon"></XIcon>
                </template>
              </template>
              <template v-else>
                <Dropdown trigger="click" @on-click="(val) => handleDropdownClick(item, type, index, val)">
                  <div style="margin:0 3px">
                    <template v-if="item.lockLabel">
                      <XIcon :iconfont="item.icon" style="vertical-align: middle;"></XIcon>
                    </template>
                    <template v-else>
                      <XIcon :iconfont="item.children[item.selected].icon" style="vertical-align: middle;"
                        :style="item.children[item.selected].style">
                      </XIcon>
                    </template>
                    <Icon type="ios-arrow-down"></Icon>
                  </div>
                  <DropdownMenu slot="list" style="text-align: center;">
                    <DropdownItem v-for="(child, childIndex) in item.children" :key="childIndex" :name="childIndex"
                      :disabled="child.disabled" :divided="child.divider" :select="item.selected === childIndex">
                      <template v-if="child.type === 'normal'">
                        <XIcon :iconfont="child.icon" :style="child.style"></XIcon>
                      </template>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </template>
          </ToolItem>
          <!-- logo显示 -->
          <ToolItem v-if="item.type === 'link'" :key="'tool_' + type + '_item_' + index" :active="item.active"
            :disabled="item.disabled" :style="item.toolbar.style">
            <template v-slot:label>
              <XIcon class="link" :iconfont="item.icon" :img="item.img"></XIcon>
            </template>
          </ToolItem>
        </template>
      </ToolBox>
    </template>
  </div>
</template>

<script>
import { DropdownMenu } from 'view-design'
import ToolBox from '../components/ToolBox/Index.vue'
import ToolItem from '../components/ToolBox/ToolItem.vue'
import ColorPicker from '../global/ColorPicker/Index.vue'
import XIcon from '../global/Icon/index.vue'
export default {
  name: 'ToolBar',
  components: {
    ToolBox,
    ToolItem,
    ColorPicker,
    XIcon,
    DropdownMenu
  },
  props: {
    editorData: Object,
    toolList: Array,
    currentItem: Array
  },
  data() {
    return {
      formData: this.editorData ? { ...this.editorData } : {}
    }
  },
  computed: {
    toolMap() {
      const _t = this
      const toolMap = {}
      console.log(this.toolList, '干掉小日本')
      this.toolList.forEach(item => {
        if (item.enableTool && item.enable && item.toolbar && item.toolbar.enable) {
          const position = item.toolbar.position
          if (Object.prototype.hasOwnProperty.call(!toolMap, position)) {
            toolMap[position] = []
          }
          toolMap[position].push(item)
        }
      })
      console.log(toolMap, '小日本你个狗日的')
      return toolMap
    }
  },
  methods: {
    // 处理label
    // handleLabel(item) {
    //   const _t = this
    //   let label = this.item.lang
    //   if (item.shortcuts) {
    //     label += ` (${item.shortcuts.label})`
    //   }
    //   return label
    // },
    handleDropdownClick(item, type, index, val) {
      const _t = this
      // console.log('handleDropdownClick', item.name)
      if (item.disabled) {
        return
      }
      const child = item.children[val]
      this.formData[item.name] = child.name
      const payload = {
        context: 'ToolBar',
        type: item.type,
        name: item.name,
        data: child.data,
        selected: val
      }
      this.$X.utils.eventbus.$emit('editor/tool/trigger', payload)
    },
    handleToolClick(item, val) {
      const _t = this
      // if (!item.disabled) {
      //   return
      // }
      console.log('handleToolClick', item.name, val)

      let payload = {
        context: 'ToolBar',
        name: item.name
      }
      switch (item.name) {
        case 'backgroundColor':
          this.formData[item.name] = val
          payload = {
            ...payload,
            data: val
          }
          break
      }
      this.$X.utils.eventbus.$emit('editor/tool/trigger', payload)
    }
  }
}
</script>

<style scoped lang="less" res="stylesheet/less">
.tool-bar {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  width: 100%;
  padding: 0 20px;
  position: fixed;
  // height: 30px;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
  background: #ffffff;
  z-index: 500;
  transition: all .5s ease-in-out;

  .tool-box {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex: 1 1 auto;
    z-index: 10;

    &.left {
      justify-content: flex-start;
    }

    &.center {
      justify-content: flex-start;
    }

    &.right {
      justify-content: flex-end;
    }

    .tool-item {
      display: inline-block;
      flex: 2;

      .link {
        display: inline-block;
        line-height: 1;
        // vertical-align: middle;
        width: 75px;
        height: 34.5px;
        text-align: left !important;
        justify-content: flex-start;

        .icon {
          width: 40px;
          height: auto;
        }
      }
    }

    .divider {
      height: calc(~"100% - 10px");
    }
  }
}

.DropdownItem:hover {
  color: blue
}
</style>
