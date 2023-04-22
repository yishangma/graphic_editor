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
      // console.log(this.currentItem, '99999999999999999999')
      this.$X.utils.eventbus.$emit('editor/panel/toggle', data)
    }
  }

}
</script>

<style scoped lang="less" rel="stylesheet/less">
</style>
