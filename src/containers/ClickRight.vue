/**
* ContextMenu 右键菜单
*/

<template>
  <div class="context-menu" v-show="isShow" :style="contextMenuStyle" @click.stop.prevent>
    <ToolBox mode="vertical">
      <template v-for="(item, index) in contextMenuList">
        <ToolItem v-if="item.type === 'dropdown-color-picker'" :key="'contextmenu_item_' + index" :active="item.active"
                  :disabled="item.disabled" :style="item.contextmenu.style" @mouseenter.native="handleItemHover">
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :iconfont="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ item.title }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            <div class="item-more">
              <Icon type="ios-arrow-forward"></Icon>
            </div>
          </template>
          <template v-slot:content>
            <ToolBox mode="vertical" style="padding: 0;">
              <ToolItem style="padding: 0;">
                <ColorPicker slot="label" v-model="formData[item.name]" :preview="false"
                             @on-change="(val) => handleToolClick(item, val, null)" @on-close="doHide">
                </ColorPicker>
              </ToolItem>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem v-if="item.type === 'dropdown-list'" :key="'contextmenu_item_' + index" :active="item.active"
                  :disabled="item.disabled" :style="item.contextmenu.style" @mouseenter.native="handleItemHover">
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :iconfont="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ item.title }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            <div class="item-more">
              <Icon type="ios-arrow-forward"></Icon>
            </div>
          </template>
          <template v-slot:content>
            <ToolBox mode="vertical">
              <template v-for="(child, childIndex) in item.children">
                <ToolItem :key="'contextmenu_item_' + index + '_child_' + childIndex" :active="child.active"
                          :disabled="child.disabled" @click.native="handleChildClick(item, child, childIndex)">
                  <template v-slot:label>
                    <template v-if="child.type === 'normal'">
                      <div class="item-icon">
                        <XIcon :iconfont="child.icon"></XIcon>
                      </div>
                      <span class="item-label">{{ child.label }}</span>
                    </template>
                    <template v-else-if="child.type === 'link'">
                      <a class="item-link" :href="child.link" target="_blank" style="color: #333333;" @click.stop>
                        <div class="item-icon">
                          <XIcon :iconfont="child.icon"></XIcon>
                        </div>
                        <span class="item-label">{{ child.label }}</span>
                      </a>
                    </template>
                  </template>
                </ToolItem>
              </template>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem v-if="item.type === 'link'" :key="'contextmenu_item_' + index" :active="item.active"
                  :disabled="item.disabled" :style="item.contextmenu.style" @click.native="handleToolClick(item)">
          <template v-slot:label>
            <a :href="item.link" target="_blank" style="color: #333333;">
              <div class="item-icon">
                <XIcon :iconfont="item.icon"></XIcon>
              </div>
              <!-- <span class="item-label">{{ $t(item.lang) }}</span> -->
              <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            </a>
          </template>
        </ToolItem>
        <ToolItem v-if="item.type === 'normal' && item.show" :key="'contextmenu_item_' + index" :active="item.active"
                  :disabled="item.disabled" :style="item.contextmenu.style" @click.native="handleToolClick(item)">
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :iconfont="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ item.title }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
          </template>
        </ToolItem>
      </template>
    </ToolBox>
  </div>
</template>

<script>
import ToolBox from '../components/ToolBox/Index.vue'
import ToolItem from '../components/ToolBox/ToolItem.vue'
import XIcon from '../global/Icon/Index.vue'
import ColorPicker from '../global/ColorPicker/Index.vue'
export default {
  name: 'ClickRight',
  components: {
    ToolBox,
    ToolItem,
    XIcon,
    ColorPicker
  },
  props: {
    editorData: Object,
    toolList: Array,
    currentItem: Array
  },
  data() {
    return {
      isShow: false,
      activeMenu: '',
      options: null,
      contextMenuList: [],
      formData: this.editorData ? { ...this.editorData } : {},
      contextMenuStyle: {}
    }
  },
  methods: {
    handleContextMenuList() {
      const contextMenuList = []
      this.toolList.forEach(item => {
        if (item.enableTool && item.enable && item.contextmenu && item.contextmenu.enable) {
          if (!Object.prototype.contextmenu.hasOwnProperty.call(item, 'target') || (Object.prototype.contextmenu.hasOwnProperty.call(item, 'target') && (item.contextmenu.target.length && this.options && this.options.type && item.contextmenu.target.includes(this.options.type)))) {
            contextMenuList.push(item)
          }
        }
      })
      this.contextMenuList = contextMenuList
    },
    handleContextMenuStyle() {
      const style = {}
      if (!this.options) {
        return style
      }
      this.$nextTick(function () {
        const x = this.options.x !== undefined ? (parseInt(this.options.x) > 0 ? parseInt(this.options.x) : 0) : 0
        const y = this.options.y !== undefined ? (parseInt(this.options.y) > 0 ? parseInt(this.options.y) : 0) : 0
        // 判断是否超出边界
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
          const winHeight = document.documentElement.clientHeight
          const winWidth = document.documentElement.clientWidth
          const elHeight = this.$el.clientHeight
          const elWidth = this.$el.clientWidth
          if (x + elWidth > winWidth) {
            style.right = '10px'
          } else {
            style.left = x + 'px'
          }
          if (y + elHeight > winHeight) {
            style.bottom = '42px'
          } else {
            style.top = y + 'px'
          }
        }
        this.contextMenuStyle = style
      })
    },
    doShow(data) {
      this.options = data
      this.handleContextMenuList()
      // 处理样式
      this.handleContextMenuStyle()
      this.isShow = true
    },
    doHide() {
      this.options = null
      this.contextMenuList = []
      this.isShow = false
    },
    handleChildClick(item, child, childIndex) {
      if (child.disabled) {
        return
      }
      const payload = {
        context: 'ContextMenu',
        name: item.name,
        type: item.type,
        data: child.data,
        selected: childIndex
      }
      this.$X.utils.eventbus.$emit('editor/tool/trigger', payload)
      this.doHide()
    },
    handleToolClick(item, val) {
      const _t = this
      if (item.disabled) {
        return
      }
      let payload = {
        context: 'ContextMenu',
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
      this.doHide()
    },
    handleItemHover(event) {
      const target = event.target
      const toolBox = target.querySelector('.tool-box')
      if (toolBox && target.clientWidth) {
        toolBox.style.left = target.clientWidth + 'px'
      }
    },
    handleEditorClick() {
      this.$X.utils.eventbus.$emit('editor/contextmenu/close')
    }
  },
  created() {
    console.log(this.toolList, '消灭小日本')
    this.$X.utils.eventbus.$on('editor/contextmenu/open', this.doShow)
    this.$X.utils.eventbus.$on('editor/contextmenu/close', this.doHide)
  }
}
</script>
<style scoped lang="less" rel="stylesheet/less">
.context-menu {
  position: absolute;
  min-width: 120px;
  width: auto !important;
  z-index: 9999;
  background: #FFF;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
  padding: 5px 0;

  .tool-box {
    padding: 0;

    .tool-item {
      padding: 8px 10px;
      display: flex;
      align-items: center;

      &:hover {
        color: #000000;
        background: rgba(0, 0, 0, .1);

        .tool-box {
          visibility: visible;
        }
      }

      .tool-box {
        visibility: hidden;
        position: absolute;
        top: 0;
        padding: 5px 0;
        background: #FFF;
        box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
      }

      .item-link {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
      }

      .item-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 1;
      }

      .item-label {
        flex: 1 1 auto;
        margin: 0 10px;
        line-height: 1;
        min-width: 60px;
        white-space: nowrap;
      }

      .item-shortcut {
        line-height: 1;
      }

      .item-more {
        display: inline-block;
        float: right;
        width: 16px;
        line-height: 1;
      }
    }

    .divider {
      width: calc(~"100% - 10px");
    }
  }
}
</style>
