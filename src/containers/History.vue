<template>
  <Modal class-name="history-model" v-model="isShow" width="660" @on-cancel="doHide">
    <div class="body">
      <template v-if="log && log.list.length">
        <div class="history-list">
          <div v-for="(item, index) in log.list" :key="index" class="list-item"
            :class="{ 'active': index === currentIndex }" @click="toggleLog(index)">
            {{ $X.utils.filters.formatDate(item.time, 'YYYY-MM-DD hh:mm:ss') }}
          </div>
        </div>
        <div id="history-preview" class="history-preview"></div>
      </template>
      <!-- <XNoData v-else></XNoData> -->
      <div v-else class="emptyShow">
        <el-empty description="还没有做操作选择哦！"></el-empty>
      </div>
    </div>
    <div slot="footer">
      <Button type="default" @click="doHide">关闭</Button>
      <Button type="primary" @click="doRevert">还原</Button>
    </div>
  </Modal>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'History',
  data() {
    return {
      isShow: false,
      graph: null,
      currentIndex: null,
      log: null
    }
  },
  methods: {
    show() {
      const _t = this
      this.getLog()
      this.isShow = true
      this.$nextTick(function () {
        this.toggleLog(0)
      })
    },
    doHide() {
      const _t = this
      if (this.graph) {
        this.graph.destroy()
        this.graph = null
        this.currentIndex = null
      }
      this.isShow = false
    },
    doRevert() {
      const _t = this
      if (!this.log) {
        return
      }
      const item = this.log.list[this.currentIndex]
      if (!item) {
        return
      }
      this.$emit('on-revert', item.content)
      this.doHide()
    },
    getLog() {
      const _t = this
      this.log = this.$X.utils.storage.get('log', this.$X.config.storage.prefix)
      console.log(this.log, 'this.log42423432')
    },
    toggleLog(index) {
      const _t = this
      if (!this.log) {
        return
      }
      const el = this.$el
      this.currentIndex = index
      const item = this.log.list[this.currentIndex]
      if (!item) {
        return
      }
      if (!this.graph) {
        // 画板
        const sketchpad = el.querySelector('#history-preview')
        const grid = new G6.Grid()
        this.editor = new G6.Graph({
          plugins: [
            grid
          ],
          container: sketchpad,
          width: sketchpad.clientWidth,
          height: sketchpad.clientHeight,
          fitView: true,
          fitViewPadding: 20,
          autoPaint: true
        })
      }
      this.editor.data(item.content)
      this.editor.render()
      const width = this.editor.get('width')
      const height = this.editor.get('height')
      const center = {
        x: width / 2,
        y: height / 2
      }
      this.editor.zoomTo(1, center)
    }
  }
}
</script>

<style scoped lang="less">
.history-model {
  .body {
    display: flex;
    margin-top: 30px;
    border: 1px solid rgba(0, 0, 0, .1);

    .emptyShow {
      text-align: center;
      margin: 0 auto;
    }

    .history-list {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      height: 600px;
      overflow: auto;

      .list-item {
        font-size: 10px;
        padding: 10px;
        cursor: pointer;

        &:hover,
        &.active {
          color: #000000;
          background: rgba(0, 0, 0, .1);
        }
      }
    }

    .history-preview {
      width: 480px;
      height: 600px;
      position: relative;
      z-index: 100;
    }

    .no-data {
      flex: 1 1 auto;
    }
  }
}</style>
