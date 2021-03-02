<template>
  <!-- 歌曲列表 -->
  <div class="songItem" @click="play(item)">
    <div><slot></slot></div>
    <div class="left">
      <h3 v-html="$options.filters.highLight(item.name,keyword)"></h3>
      <p>
        <template v-if="item.song" >
          {{item.song.artists[0].name}}
        </template>
        <template v-if="item.artists">
          {{item.artists[0].name}}
        </template>
        
         - {{item.name}}</p>
    </div>
    <span class="playBtn"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    play(item){
      this.$root.musicStore.musicId = item.id
      this.$root.musicStore.currentMusic = item
      this.$root.musicStore.musicList.clear()
      for(let item of this.allSongLists){
        this.$root.musicStore.musicList.add(item)
      }
    }
  },
  props:["item","keyword",'allSongLists'],
  filters:{
    // 搜索的字显示高亮
    highLight(val,keyword){
      // 传了keyword才会执行下面的代码
      if(typeof keyword == 'undefined'){
        return val
      }
      // 以keyword创建全局正则表达式
      let reg = new RegExp(keyword,'g')
      if(reg.test(val)){
        // 匹配成功用html标签替换
        return val.replace(reg,'<span style="color:red">'+keyword+'</span>')
      }
      return val
    }
  }
}
</script>

<style lang="less" scoped>
  .songItem{
    display: flex;
    align-self: center;
    border-bottom: 1px solid #eee;
    padding: .3rem 0px;
    width: 100%;
    .left{
      flex: 8;
      h3{
        color: #333;
        margin-bottom: .25rem;
        font-size: .85rem;
      }
      p{
        font-size:.6rem;
        color: #888;
      }
    }
    .playBtn{
      // flex: 1;
      margin-top: .5rem;
      width: 1.1rem;
      height: 1.1rem;
      background: url("../assets/index_icon.png") no-repeat -24px 0px;
      background-size: 8.3rem 4.85rem;
    }
  }
</style>
