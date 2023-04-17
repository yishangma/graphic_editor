<!-- 修改记录
2月24日：用多个div来设置渲染导航栏
2月25日：用v-for结合v-if来优化 减少代码量 -->
<template>
  <div class="tool-bar">
    <template v-for="(type, typeIndex) in Object.keys(toolMap)">
      <ToolBox mode="horizontal" :key="typeIndex">
        <template v-for="(item, index) in toolMap[type]">
          <ToolItem v-if="item.type === 'dropdown-color-picker'" :key="'tool_' + type + '_item_' + index"
                    :active="item.active" :disabled="item.disabled" :style="item.toolbar.style">
            <template v-slot:label>
              <template v-if="item.disabled">
                <ColorPicker v-model="formData[item.name]" @on-change="(val) => handleToolClick(item, val, null)">
                  <div style="margin:0 3px;" slot="preview">
                    <Icon class="icon-down" type="ios-arrow-down" />
                  </div>
                </ColorPicker>
              </template>
            </template>
          </ToolItem>
          <ToolItem v-if="item.type === 'dropdown-list'" :key="'tool_' + type + '_item_' + index"
                    :title="handleLabel(item)" :active="item.active" :disabled="item.disabled" :style="item.toolbar.style">
            <template v-slot:lable>
              <Dropdown trigger="click" @on-click="(val) => handleDropdownClick(item, type, index, val)">
                <div style="margin:0 3px;">
                  <template v-if="item.lockLabel">
                    <XIcon :iconfont="item.icon" :label="handleLabel(item)" style="vertical-align: middle;"></XIcon>
                  </template>
                  <template v-else>
                    <XIcon :iconfont="item.children[item.selected].icon" :label="item.children[item.selected].label"
                           style="vertical-align: middle;" :style="item.children[item.selected].style">
                    </XIcon>
                  </template>
                </div>
              </Dropdown>
            </template>
          </ToolItem>
          <ToolItem v-if="item.type === 'normal'" :key="'tool_' + type + '_item_' + index" :title="handleLabel(item)"
                    :active="item.active" :disabled="item.disabled" :style="item.toolbar.style"
                    @click.native="handleToolClick(item)">
            <template v-slot:label>
              <XIcon :iconfont="item.icon" :label="handleLabel(item)"></XIcon>
            </template>
          </ToolItem>
        </template>
      </ToolBox>
    </template>
  </div>
</template>

<script>
import { Dropdown } from 'view-design'
import ToolBox from '../components/ToolBox/Index.vue'
import ToolItem from '../components/ToolBox/ToolItem.vue'
import ColorPicker from '../global/ColorPicker/Index.vue'
import XIcon from '../global/Icon/Index.vue'
export default {
  name: 'ToolBar',
  components: {
    ToolBox,
    ToolItem,
    ColorPicker,
    XIcon,
    Dropdown
  },
  props: {
    editorData: Object,
    toolList: Array,
    currentItem: Array
  },
  data() {
    return {
      formData: this.editorData ? { ...this.editorData } : {},
    }
  },
  computed: {
    toolMap() {
      const _t = this
      const toolMap = {}
      console.log(this.toolList, '干掉小日本')
      _t.toolList.forEach(item => {
        if (item.enableTool && item.enable && item.toolbar && item.toolbar.enable) {
          const position = item.toolbar.position
          if (!toolMap.hasOwnProperty(position)) {
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
    handleLabel(item) {
      const _t = this
      let label = _t.$t(item.lang)
      if (item.shortcuts) {
        label += ` (${item.shortcuts.label})`
      }
      return label
    },
    handleDropdownClick(item, type, index, val) {
      const _t = this
      // console.log('handleDropdownClick', item.name)
      if (item.disabled) {
        return
      }
      const child = item.children[val]
      _t.formData[item.name] = child.name
      const payload = {
        context: 'ToolBar',
        type: item.type,
        name: item.name,
        data: child.data,
        selected: val
      }
      _t.$X.utils.bus.$emit('editor/tool/trigger', payload)
    },
    handleToolClick(item, val) {
      const _t = this
      // console.log('handleToolClick', item.name, val)
      if (item.disabled) {
        return
      }
      let payload = {
        context: 'ToolBar',
        name: item.name
      }
      switch (item.name) {
        case 'fill':
        case 'lineColor':
          _t.formData[item.name] = val
          payload = {
            ...payload,
            data: val
          }
          break
        case 'toFront':
        case 'toBack':
          payload = {
            ...payload,
            data: _t.currentItem
          }
          break
      }
      _t.$X.utils.eventbus.$emit('editor/tool/trigger', payload)
    },
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

      .link {
        display: inline-block;
        line-height: 1;
        vertical-align: middle;

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
</style>
