<template>
  <div id="app">
    <TopNav></TopNav>
    <Play></Play>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div v-if="$root.musicStore.musicId" style="height:60px"></div>
  </div>
</template>

<script>
import TopNav from "components/TopNav"
import Play from "components/Play"
export default {
  components:{
    TopNav,
    Play
  }
}
</script>

<style lang="less">
  
</style>
