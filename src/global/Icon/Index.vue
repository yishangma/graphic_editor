/**
*
* Icon
*/

<style scoped lang="less" rel="stylesheet/less">
.icon {
  display: inline-block;

  .iconfont {}

  .img {
    width: 100%;
    height: auto;
  }

  .label {}
}
</style>

<template>
  <div class="icon" :title="title">
    <div v-if="iconfont" class="iconfont" :class="iconfont"></div>
    <img v-else-if="img" class="img" :src="img">
    <div v-else class="label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  name: 'XIcon',
  props: {
    iconfont: String,
    img: String,
    label: String,
    title: String
  }
}
</script>
