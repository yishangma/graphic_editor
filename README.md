# graduate\_

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

一.项目开始准备

1.1 src/editor/index.vue---> 项目的主组件 也即入口文件 所有页面都在 Index.vue 下进行切换，负责构建定义及页面组件归集

1.2 注意安装 less 依赖 npm install less --save-dev npm install less less-loader --save-dev

1.3 图标下载 采用阿里巴巴矢量图标库 选好图标之后下载到 iconfont 文件夹 之后引入到工程文件中

1.4 按需导入 iview npm i iview --save ;安装插件 在 vue-ui 可视化界面中安装：eslint-plugin-import

2.1 参考文章实现拖拽：https://juejin.cn/post/6924156555617271821#heading-0

二.出现的问题？

1.颜色下拉列表选择如何实现？

2.svg 图的跨组件拖拽功能

3.编辑面板的背景网格如何实现？

开发过程中出现错误解决：
1.Parsing error：Unexpected token 它的意思是开发环境与 eslint 当前的解析功能不兼容
解决：安装 babel-eslint npm install babel-eslint 在.eslintrc.js 中添加"parser":"babel-eslint"

2.22 日

1.建立组件，把编辑器 ui 界面模型渲染出来

2.安装 vue-color 解决颜色选择器的问题,封装颜色选择器组件 安装 vue-color 注意引入的格式 import {Sketch} from 'vue-color'

3.用 v-for 结合 v-if 来优化 ToolBar.vue 组件 在 data 中定义 toolList 用于存储图标类名，之后用 v-for 遍历这个类来渲染到页面中，注意格式 v-for='(item,index) in toolList' 后面要用 item.type 并且为 class 绑定 v-bind

2.26 日

1.对颜色选择器组件封装

2.对于颜色选择器的点击事件的进一步完善：当点击图像背景的工具按钮时，则展开颜色选择器，但是这里有个问题，在点击关闭之后确实会关闭这个颜色选择器，那我再想点开这个呢？因为我在./ColorPicker/Index.vue 中 设置了一个关闭按钮的点击事件 Close，并且使用 v-show 来实现显示和隐藏，点击之后把 showPanel 参数设置为 false.对于这个问题，我最开始想的是封装组件使用插槽来实现，把页面的整体包括图标，下箭头和颜色选择器全部封装在组件中，这个其实也是一个好方法，但是最后实际操作过程中还是没能实现。这里其实还是有个问题，我注册了两个点击事件，导致关闭和确认虽然可以响应，但是不是即时的。

3.进一步优化整体 ui 界面，大体上除了中间的画板，都完成了。全屏显示用的是 screenfull 工具->https://blog.csdn.net/nxw_tsp/article/details/106367293

4.在做线条组件时（LineBox.vue) 有一个属性要注意，tabIndex 因为我想做一个点击之后改变颜色的效果，需要用到 active 和 focus 两个伪类，但是 div 等元素无法接受键盘或其他用户事件，即不支持 focus 伪类，可通过增加 tabIndex 属性使其支持 focus 详情看https://www.php.cn/css-tutorial-474524.html

2 月 27 日

1.完成了中间画板，借助的是 antv/x6，其次在昨天完成的基础上对 ui 界面进一步完善。

2.左边侧栏的图形 采用 svg 来实现 具体看官方文档 我这里封装了两个组件 用于单独存放绘制 svg 矢量图的数据并绘制，

3.实现拖拽功能：
原理：div 的属性 draggable 为 true 代表元素可以拖动 同时在操作面板中要绑定一个事件@drop 和@draggover='e=>e.preventDefault()'
叠放只有在绝对定位的情况下才有效。

4.鉴于后面对图形拖动的时候的准确性和代码的可读性，对于图形的渲染修改，第一次是用一个一个的盒子来实现的，但是当添加 mousedown 事件时就会很麻烦，最好的方法是根据每一个图形的某种属性来添加对应的事件，所以把所有的图形的数据放在静态的文件夹中，导入即可；同时，这里我采用的是 v-html 指令，把不在文档流中的元素按照循环遍历结合 v-html 指令创建到文档树中。

5.对元素设置一个 mousedown 事件，取得鼠标的光标点击时的 x 和 y 值（offsetX，offsetY），其次在拖动之后要放下的时候也取得 x 和 y 值（offsetX 和 offsetY）之后用后面的 x 和 y 减去前面的 x 和 y 得到图形要放置的位置。

2 月 28

1.今天修改了画板的渲染方式，第一次时 antv x6，但是对于因为会有复杂的交互逻辑和操作，所以选择了 antv 的 G6

2.实现了把左边的图形拖动到画板中，但是存在一个问题，也就是目前还不能向预想的那样把图形的原样式拖动到画板中，现在只是实现了一个拖动效果的交互，现在我的猜想是要用图形的数组来在画板中再绘制一次，还不能解决。

3 月 3 日

1.目前已经初步完成了图形的拖拽，以及锚点，图形可放大缩小等功能，和我预想的一样，这是面板，如果要把图形写入面板中，不能用原生 js 的方法，直接对图形拖拽，而是需要重写每个图形对应的配置，属性。antv 可以自定义节点，如果遇到比较复杂的图形，比如有曲线的图形，那么就要用 path，所以，这种工作量比较大，因为要对每一个图形重写，另建一个文件夹，用于存储这些节点的 options；在节点组件中，设定一个鼠标点击事件，鼠标点击一个图形之后，把这个图形的信息传递给面板组件中，在面板组件中接收图形的信息，在 created 声明周期中，把这个信息传递给在面板组件中编写的函数，这个函数可以按照传递来的信息，对要写的节点配置，比如 type，宽度，高度，配置好之后，在这个函数中，把配置好的节点 node 传递给我们已经编写好的自定义交互事件中，之后就可以按照信息在画板中重新绘制与要拖动的图形的复制版。

3 月 4 日

今天把整体页面完成，包括左边图形区和画板之间的交互，剩下的是导航栏和右边配置类与画板之间的交互，这需要一点时间

毕业论文构建思路

1.背景意义，现行研究与现状分析

2.说说开发工具和环境 相关技术（pixso 画 ui 编辑器->vscode 技术的话 重点说 vue 和 antV/G6 以及 js css 可以简单介绍，脚手架也可以说一下，但是我用的是 vue-ui 同时还有用到的插件依赖）

3.说一下设计思路 比如从哪里开始 怎么去绘制的 ui 怎么结合 antv/g6 去画画布 各组件之间的通信原理（这里是事件总线 并没有用 vuex 亦或是 props） 还有如何把图形放到画板中 这里可以重点介绍 自定义事件 自定义节点 节点控制 边的事件等

4.可以把目录说一下 项目结构 参考https://max.book118.com/html/2019/0726/8107107035002037.shtm
