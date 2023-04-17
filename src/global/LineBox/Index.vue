<!--导航栏中的线条类型 -->
<template>
  <div class="line-select-list">
    <div class="line-menu">
      <div class="line-item">
        <div class="icon">
          <div tabIndex="1" class="iconfont icon-zhixian icon-color"></div>
        </div>
      </div>
      <div class="line-item">
        <div class="icon">
          <div tabIndex="1" class="iconfont icon-xuxian icon-color" ></div>
        </div>
      </div>
      <div class="line-item">
        <div class="icon">
          <div tabIndex="1" class="iconfont icon--xiaoxuxian icon-color"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineBox'
}
</script>

<style scoped lang="less" rel="stylesheet/less">
.line-select-list{
  // margin-top:20px;
  // width:94px;
  height:120px;
  border:1px solid rgba(0,0,0,.1);
  position: relative;
  .line-menu{
    position:absolute;
    height:100%;
    .line-item{
      height:40px;
      width:94px;
      background-color:#fff;
      .icon-color:active{
        color:blue;
      }
      .icon-color:focus{
        color:blue;
      }
      .icon:hover{
        background:rgba(0,0,0,.1);
      }
    }
  }
  li{
    list-style: none;
  }
}
</style>
