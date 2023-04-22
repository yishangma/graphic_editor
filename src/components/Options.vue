<template>
  <div class="options">
    <Form v-if="isNode || isEdge">
      <!-- 元素属性 -->
      <CardItem v-if="isNode" title="属性" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="X">
              <InputNumber class="input-number" v-model="formData.attrs.x" size="small"
                @on-change="val => handleChange(val, 'x')"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Y">
              <InputNumber class="input-number" v-model="formData.attrs.y" size="small"
                @on-change="val => handleChange(val, 'y')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Width">
              <InputNumber class="input-number" v-model="formData.attrs.width" size="small"
                @on-change="val => handleChange(val, 'width')"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Height">
              <InputNumber class="input-number" v-model="formData.attrs.height" size="small"
                @on-change="val => handleChange(val, 'height')"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素样式 -->
      <CardItem title="外观样式" :enableFold="true">
        <div class="form-item-block">
          <template>
            <div class="row">
              <FormItem class="col" label="填充">
                <ColorPicker v-model="fillColor" class="colorpicker-item"
                  @on-change="val => handleChange(val, 'fillColor')"></ColorPicker>
              </FormItem>
              <FormItem class="col" label="透明度填充">
                <InputNumber class="input-number" size="small" :min="0" :max="1" :step="0.1"
                  @on-change="val => handleChange(val, 'fillOpacity')"></InputNumber>
              </FormItem>
            </div>
            <div class="row">
              <FormItem class="col col-large col-start" label="方向渐变填充">
                <div class="row row-start">
                  <ColorPicker class="optionColorPicker" v-model="fillColor"
                    @on-change="val => handleChange(val, 'gradientDirection')"></ColorPicker>
                  <Select class="col" size="small">
                    <Option class="option" v-for="(item, index) in gradientDirectionList" :key="index"
                      v-model="item.value" :label="item.label"></Option>
                  </Select>
                </div>
              </FormItem>
            </div>
          </template>
          <div class="row">
            <FormItem class="col" label="Stroke">
              <ColorPicker v-model="formData.style.stroke" @on-change="val => handleChange(val, 'stroke')">
              </ColorPicker>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="线条类型">
              <Select v-model="lineDashName" size="small">
                <Option v-for="(item, index) in  lineDashList" :key="index"></Option>
              </Select>
            </FormItem>
            <FormItem class="col" label="线宽">
              <InputNumber class="input-number" size="small" :min="1" :max="10" :step="1"
                @on-change="val => handleChange(val, 'lineWidth')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="阴影颜色">
              <ColorPicker v-model="formData.style.shadowColor" @on-change="val => handleChange(val, 'shadowColor')">
              </ColorPicker>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="阴影偏移(X)">
              <InputNumber size="small" :min="-10" :max="10" :step="1"
                @on-change="val => handleChange(val, 'shadowOffsetX')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="阴影偏移(Y)">
              <InputNumber size="small" :min="-10" :max="10" :step="1"
                @on-change="val => handleChange(val, 'shadowOffsetY')"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素文本样式 -->
      <CardItem title="文本样式" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="文本">
              <Input size="small" style="width:260px;" v-model="formData.label"
                @on-change="val => handleChange(val, 'label')" />
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="位置" v-if='formData.labelCfg'>
              <Select size="small" v-model="formData.labelCfg.position"
                @on-change="val => handleChange(val, 'labelCfg.position')">
                <Option value="center">center</Option>
                <Option value="top">top</Option>
                <Option value="left">left</Option>
                <Option value="right">right</Option>
                <Option value="bottom">bottom</Option>
              </Select>
            </FormItem>
            <FormItem class="col" label="offset" v-if="formData.labelCfg">
              <InputNumber size="small" v-model="formData.labelCfg.offset"
                @on-change="val => handleChange(val, 'labelCfg.offset')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="文本颜色">
              <ColorPicker v-model="formData.labelStyle.fill" @on-change="val => handleChange(val, 'labelStyle.fill')">
              </ColorPicker>
            </FormItem>
            <FormItem class="col" label="文本透明度">
              <InputNumber class="input-number" v-model="formData.labelStyle.opacity" size="small" :min="0" :max="1"
                :step="0.1" @on-change="val => handleChange(val, 'labelStyle.opacity')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="rol" label="字体粗细(FontWeight)">
              <InputNumber class="input-number" v-model="formData.labelStyle.fontWeight" :min="100" :max="1000"
                :step="100" @on-change="val => handleChange(val, 'labelStyle.fontWeight')"></InputNumber>
            </FormItem>
            <FormItem class="rol" label="字体大小(FontSize)">
              <InputNumber class="input-number" v-model="formData.labelStyle.fontSize" :min="12" :max="50" :step="1"
                @on-change="val => handleChange(val, 'labelStyle.fontSize')"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
    </Form>
  </div>
</template>

<script>
import CardItem from './CardItem.vue'
import ColorPicker from '../global/ColorPicker/Index.vue'
export default {
  name: 'Options',
  components: {
    CardItem,
    ColorPicker
  },
  props: {
    editorConfig: Object,
    toolList: Array,
    currentItem: Array
  },
  data() {
    return {
      firstItem: null,
      lineDashName: null,
      gradientDirection: 0,
      fillColor: '#FFFFFF',
      gradientColor: '#FFFFFF',
      formData: {},
      // 渐变方向列表
      gradientDirectionList: [
        { name: 'top', label: 'Top', value: 270 },
        { name: 'right', label: 'Right', value: 0 },
        { name: 'bottom', label: 'Bottom', value: 90 },
        { name: 'left', label: 'Left', value: 180 }
      ],
      defaultValue: {
        fill: '#000000',
        // shadowColor: '#999999',
        // shadowBlur: 5,
        // shadowOffsetX: 5,
        // shadowOffsetY: 5,
        textAlign: 'center',
        textBaseline: 'middle',
        fontWeight: 400,
        fontSize: 17
      }
    }
  },
  computed: {
    lineDashList() {
      const _t = this
      const edgeConfig = this.editorConfig ? this.editorConfig.edge : null
      const lineDash = this.toolList.find(item => item.enableTool && item.name === 'lineDash')
      const list = []
      if (edgeConfig && lineDash && lineDash.enable && lineDash.children) {
        lineDash.children.forEach(item => {
          if (item.enable) {
            const typeData = edgeConfig.type[item.name]
            list.push({
              name: item.name,
              label: item.label,
              lang: item.lang,
              icon: item.icon,
              lineDash: typeData && typeData.lineDash ? typeData.lineDash : []
            })
          }
        })
      }
      return list
    },
    isNode() {
      return this.firstItem && this.firstItem.type === 'node'
    },
    isEdge() {
      return this.firstItem && this.firstItem.type === 'edge'
    },
    isCanvas() {
      return !this.firstItem
    }
  },
  watch: {
    currentItem: {
      handler(val) {
        console.log(val, '00000000000000000000')
        const _t = this
        // 取第一个节点
        console.log(val, 'valvalvalvalvalval')
        this.firstItem = val[0]
        console.log(this.firstItem, '2023412')

        if (this.firstItem) {
          // 解构属性
          const model = JSON.parse(JSON.stringify(this.firstItem.model))
          const { labelCfg } = model
          const formData = {}
          if (this.isNode) {
            const { x, y, width, height, style, label } = model
            // 元素属性
            formData.attrs = {
              x,
              y,
              width,
              height
            }
            // 元素样式属性
            formData.style = {
              fill: style.fill,
              stroke: style.stroke,
              lineWidth: style.lineWidth,
              lineDash: style.lineDash,
              shadowColor: style.shadowColor || this.defaultValue.shadowColor,
              shadowBlur: style.shadowBlur || this.defaultValue.shadowBlur,
              shadowOffsetX: style.shadowOffsetX || this.defaultValue.shadowOffsetX,
              shadowOffsetY: style.shadowOffsetY || this.defaultValue.shadowOffsetY,
              fillOpacity: style.fillOpacity
            }
            // 元素文本
            formData.label = label
            formData.labelCfg = {
              position: labelCfg.position,
              offset: labelCfg.offset
            }
          } else if (this.isEdge) {
            const {
              // type,
              style,
              label
            } = model
            // 元素属性
            // formData.attrs = {
            //   type
            // }
            // 元素样式属性
            formData.style = {
              stroke: style.stroke,
              lineWidth: style.lineWidth,
              lineDash: style.lineDash,
              shadowColor: style.shadowColor || this.defaultValue.shadowColor,
              shadowBlur: style.shadowBlur || this.defaultValue.shadowBlur,
              shadowOffsetX: style.shadowOffsetX || this.defaultValue.shadowOffsetX,
              shadowOffsetY: style.shadowOffsetY || this.defaultValue.shadowOffsetY,
              strokeOpacity: style.strokeOpacity,
              lineAppendWidth: style.lineAppendWidth,
              endArrow: style.endArrow,
              startArrow: style.startArrow
            }
            // 元素文本
            formData.label = label
            formData.labelCfg = {
              position: labelCfg.position,
              refX: labelCfg.refX,
              refY: labelCfg.refY,
              autoRotate: labelCfg.autoRotate
            }
          }
          // 元素文本样式，节点与边通用
          formData.labelStyle = {
            fill: labelCfg.style.fill || this.defaultValue.fill,
            // stroke: labelCfg.style.stroke,
            lineWidth: labelCfg.style.lineWidth,
            // shadowColor: labelCfg.style.shadowColor,
            // shadowBlur: labelCfg.style.shadowBlur,
            // shadowOffsetX: labelCfg.style.shadowOffsetX,
            // shadowOffsetY: labelCfg.style.shadowOffsetY,
            opacity: labelCfg.style.opacity,
            font: labelCfg.style.font,
            textAlign: labelCfg.style.textAlign || this.defaultValue.textAlign,
            textBaseline: labelCfg.style.textBaseline || this.defaultValue.textBaseline,
            fontStyle: labelCfg.style.fontStyle,
            fontVariant: labelCfg.style.fontVariant,
            fontWeight: labelCfg.style.fontWeight || this.defaultValue.fontWeight,
            fontSize: labelCfg.style.fontSize || this.defaultValue.fontSize,
            fontFamily: labelCfg.style.fontFamily,
            lineHeight: labelCfg.style.lineHeight
          }
          // 处理线条样式
          const target = this.lineDashList.find(item => {
            if (Object.prototype.hasOwnProperty.call(item, 'lineDash') && Object.prototype.hasOwnProperty.call(formData, 'lineDash')) {
              return JSON.stringify(item.lineDash) === JSON.stringify(formData.style.lineDash)
            }
            return false
          })
          this.lineDashName = target ? target.name : ''
          // 处理填充色
          if (/^l\(\d{1,3}\)/gi.test(formData.style.fill)) {
            const gradientDirection = formData.style.fill.match(/^l\((\d{1,3})\)/gi)[0].match(/\d{1,3}/gi)[0]
            const [fillColor, gradientColor] = formData.style.fill.match(/[0,1]{1}:#([\da-f]{3}){1,2}/gi)
            // console.log('fileColor', gradientDirection, typeof gradientDirection, fillColor, gradientColor)
            this.gradientDirection = gradientDirection ? parseInt(gradientDirection) : 0
            this.fillColor = fillColor.replace('0:', '')
            this.gradientColor = gradientColor.replace('1:', '')
          }
          this.formData = formData
        } else {
          this.formData = {}
        }
      },
      deep: true
    }
  },
  methods: {
    handleChange(val, from) {
      const _t = this
      // console.log('change', val, from)
      // 处理数据
      let model = {
        style: this.formData.style,
        label: this.formData.label,
        labelCfg: {
          ...this.formData.labelCfg,
          style: this.formData.labelStyle
        }
      }
      if (this.isNode) {
        model = {
          ...model,
          ...this.formData.attrs,
          size: [this.formData.attrs.width, this.formData.attrs.height]
        }
      }
      // 处理lineDash
      if (this.lineDashName) {
        const target = this.lineDashList.find(item => item.name === this.lineDashName)
        model.style.lineDash = target ? target.lineDash : []
      }
      // 处理渐变色
      if (typeof this.gradientDirection === 'number' && this.gradientColor && this.fillColor) {
        model.style.fill = `l(${this.gradientDirection}) 0:${this.fillColor} 1:${this.gradientColor}`
      } else {
        model.style.fill = this.fillColor
      }
      // console.log('model', JSON.stringify(model))
      // 当前节点数组
      const currentItemArr = this.currentItem
      // 更新第一个节点
      if (this.firstItem) {
        currentItemArr[0] = {
          ...this.firstItem,
          model
        }
      }
      // 广播事件
      this.$X.utils.eventbus.$emit('editor/currentItem/update', currentItemArr)
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.options {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 13px;

  .form-item-block {
    padding: 10px 20px;
    font-size: 12px;

    .row {
      font-size: 12px;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: space-between;

      &.row-start {
        justify-content: flex-start;
      }

      .col {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: auto;
        line-height: 1;

        &.col-large {
          width: 100%;

          .ivu-form-item-content {
            flex: 1 1 auto;
          }
        }

        &.col-start {
          justify-content: flex-start;
        }

        +.col {
          margin-left: 10px;
        }

        .ivu-form-item-label {
          min-width: 50px;
          text-align: right;
          padding: 0 10px 0 0;
        }

        .ivu-form-item-content {
          display: inline-block;
          min-width: 80px;
        }
      }
    }

    .input-number {
      /*width: 60px;*/
    }

    .color-picker-box {
      .color-preview {
        display: inline-block;
        width: 20px;
        height: 20px;
      }

      .color-picker {}
    }
  }
}

.ivu-form-item-label {
  font-size: 12px;
}
</style>
