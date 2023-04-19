export default function (system = {}, disableTools = [], enableTools = [], shortcutMap = {}) {
  // 工具项快捷键列表
  shortcutMap = {
    chexiao: {
      tool: 'chexiao',
      key: 'mod+z',
      label: 'Ctrl + Z',
      description: ''
    },
    // 日志--------------------------------------------
    clear: {
      tool: 'clear',
      key: 'mod+shift+l',
      label: 'Ctrl + Shift + L',
      description: ''
    },
    history: {
      tool: 'history',
      key: 'mod+shift+h',
      label: 'Ctrl + Shift + H',
      description: ''
    },
    redo: {
      tool: 'redo',
      key: 'mod+shift+z',
      label: 'Ctrl + shift + Z',
      description: ''
    },
    // 删除---------------------
    delete: {
      tool: 'delete',
      key: 'mod+shift+c',
      label: 'Ctrl + Shift + C',
      description: ''
    },
    // 放大----------------------------------------------------------------
    Fangda: {
      tool: 'Fangda',
      key: ['mod+=', 'mod+plus'],
      label: 'Ctrl + +',
      description: ''
    },
    Suoxiao: {
      tool: 'Suoxiao',
      key: 'mod+-',
      label: 'Ctrl + -',
      description: ''
    },
    selectAll: {
      tool: 'selectAll',
      key: 'mod+a',
      label: 'Ctrl + A',
      description: ''
    },
    up: {
      tool: 'up',
      key: 'up',
      label: 'up',
      description: ''
    },
    down: {
      tool: 'down',
      key: 'down',
      label: 'down',
      description: ''
    },
    left: {
      tool: 'left',
      key: 'left',
      label: 'left',
      description: ''
    },
    right: {
      tool: 'right',
      key: 'right',
      label: 'right',
      description: ''
    },
    ...shortcutMap
  }

  // 工具列表
  let toolList = [{
    // 工具项名称，保持唯一性，便于区分工具项
    name: 'logo',
    // 文本，无lang时可取label值显示
    label: 'logo',
    // 多语言code码
    lang: 'L10000',
    // 工具项类型，不同的工具类型在ToolBar、ContextMenu里的表现不一样
    type: 'link',
    // 工具项图标
    icon: '',
    img: system.logo,
    // 跳转连接
    link: system.site,
    // 是否启用该工具项，用户控制是否启用该工具项
    enableTool: true,
    // 是否启用，用于动态控制是否在界面上创建该工具项
    enable: true,
    // 启用模式，用于控制在什么模式下启用该工具项
    enableMode: ['edit', 'preview'],
    // 是否禁用，用于控制界面上已创建的工具项是否处于禁用状态
    disabled: false,
    // 禁用模式，用于控制在什么模式下该工具项处于禁用状态，详见Editor/Index.vue 中的doSetMode方法
    disabledMode: ['edit', 'preview'],
    // 热键
    shortcuts: '',
    // 工具栏
    toolbar: {
      // 是否启用
      enable: true,
      // 位置
      position: 'left',
      // 样式
      style: {
        opacity: 1
      },
      // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
      divider: false
    },
    // 右键菜单
    contextmenu: {
      // 是否启用
      enable: false,
      // 目标元素类型，用于控制在什么元素上可以显示该工具项
      target: [],
      style: {},
      // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
      divider: false
    }
  },
    // 撤销-----------------------------------------------------
    {
      name: 'chexiao',
      label: 'Chexiao',
      lang: 'L10001',
      type: 'normal',
      icon: 'icon-back',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.chexiao,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
//   全屏展示-------------------------
     {
      name:fullscreen;
      label: 'fullscreen',
      lang: 'L10025',
      type: 'normal',
      icon: 'full-screen',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    // 清除日志--------------------------------------------------------------
    {
      name: 'clear',
      label: 'Clear',
      lang: 'L10032',
      type: 'normal',
      icon: 'icon-rizhi',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.clear,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    // 历史记录---------------------------------------------------
    {
      name: 'history',
      label: 'history',
      lang: 'L10041',
      type: 'normal',
      icon: 'icon-history',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.history,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    // 删除----------------------------------------------
    {
      name: 'delete',
      label: 'Delete',
      lang: 'L10005',
      type: 'normal',
      icon: 'icon-ashbin',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.delete,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      }
    },
    // 放大----------------------------------------
    {
      name: 'Fangda',
      label: 'Zoom In',
      lang: 'L10006',
      type: 'normal',
      icon: 'icon-zoom-out',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      // FIXME mod+= 用于支持主键盘区的+，mod+plus用于支持数字键盘区的+
      shortcuts: shortcutMap.Fangda,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    // 缩小-----------------------------------------------
    {
      name: 'Suoxiao',
      label: 'Zoom Out',
      lang: 'L10007',
      type: 'normal',
      icon: 'icon-zoom-in',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: shortcutMap.Suoxiao,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      }
    },
    // 背景颜色----------------------------------------------------
    {
      name: 'backgroundColor',
      label: 'Canvas background',
      lang: 'L10034',
      type: 'dropdown-color-picker',
      icon: 'icon-beijingyanse',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: true,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [{
        name: 'default',
        label: 'Default',
        lang: 'L10039',
        type: 'normal',
        icon: '',
        style: {},
        data: 'default',
        enable: true,
        disabled: false,
        divider: false
      },
        {
          name: 'image',
          label: 'Image',
          lang: 'L10040',
          type: 'normal',
          icon: '',
          style: {},
          data: 'image',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    //直线--------------------------------
    {
      name: 'lineType',
      label: 'line style',
      lang: 'L10014',
      type: 'dropdown-list',
      icon: 'icon-zhixian',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: false,
      // 子节点
      children: [{
        name: 'solid',
        label: 'solid',
        lang: '',
        type: 'normal',
        icon: 'icon-zhixian',
        data: 'solid',
        enable: true,
        disabled: false,
        divider: false
      },
        {
          name: 'dashed',
          label: 'dashed',
          lang: '',
          type: 'normal',
          icon: 'icon--xuxian',
          data: 'dashed',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'dot',
          label: 'dot',
          lang: '',
          type: 'normal',
          icon: 'icon--xiaoxuxian',
          data: 'dot',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    // 下载--------------------------------------------------------
    {
      name: 'Download',
      label: 'download',
      lang: 'L10030',
      type: 'dropdown-list',
      icon: 'icon-download',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [{
        name: 'image',
        label: 'Image',
        lang: '',
        type: 'normal',
        icon: 'icon-tupian',
        style: {},
        data: 'image',
        enable: true,
        disabled: false,
        divider: false
      },
        {
          name: 'json',
          label: 'Json',
          lang: '',
          type: 'normal',
          icon: 'icon-JSON',
          style: {},
          data: 'json',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    // 全屏--------------------------------------------------------
    {
      name: 'fullscreen',
      label: 'fullscreen',
      lang: 'L10025',
      type: 'normal',
      icon: 'full-screen',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    // FIXME 纯快捷键
    {
      name: 'up',
      label: 'Up',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.up,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'down',
      label: 'Down',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.down,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'left',
      label: 'Left',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.left,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'right',
      label: 'Right',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.right,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    }
  ]
  // 处理禁用或启用
  if (Array.isArray(disableTools) && disableTools.length) {
    toolList = toolList.filter(item => !disableTools.includes(item.name))
  } else if (Array.isArray(enableTools) && enableTools.length) {
    toolList = toolList.filter(item => enableTools.includes(item.name))
  }
  return {
    shortcutMap,
    toolList
  }
}
