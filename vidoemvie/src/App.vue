<template>
  <div id="app">
    <!-- 一级路由 -->
    <router-view/>
  </div>
</template>

<style lang="less">
body,
html {
  height: 100%;
  background: #d0d0d0;
}

#app {
  height: 100%;
}

.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
// 全局样式

.fl{
  float: left;
}
.fr{
  float: right
}

.clearfix::after{
  display: block ;
  content: '';
  clear: both ;
}

.auto-img{
  width: 100% ;
  height: 100% ;
  display: block ;
}

.one-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tow-text {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

p {
  margin: 0;
}

</style>
