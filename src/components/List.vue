<template>
  <!-- 播放歌曲列表 -->
  <div class="list">
    <div @click="playStyle" class="playStyle" v-html="list1[clickCount]"></div>
    <ul>
      <li
        v-for="item in $root.musicStore.musicList"
        :key="item.id"
        :style="{color:item.id == $root.musicStore.musicId?'red':null}"
        @click="changeMusic(item)"
      >{{item.name}} - {{item.song.artists[0].name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickCount: 0,
      list1: [
        '<span class="iconfont">&#xe690;</span> 顺序播放',
        '<span class="iconfont">&#xe609;</span> 随机播放',
        '<span class="iconfont">&#xe603;</span> 单曲循环',
      ],
    };
  },
  created() {
    this.clickCount = this.$root.musicStore.playStyle;
  },
  methods: {
    changeMusic(item) {
      this.$root.musicStore.musicId = item.id;
      this.$root.musicStore.currentMusic = item;
      this.$emit('changeIcon',true)
    },
    playStyle() {
      this.clickCount++;
      this.clickCount > 2 ? (this.clickCount = 0) : this.clickCount;
      this.$root.musicStore.playStyle = this.clickCount;
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  background: url(../assets/music-bg.jpg) no-repeat;
  background-size: cover;
  padding-top: 0.5rem;
  position: absolute;
  width: 100vw;
  left: 0;
  bottom: 3rem;
  .playStyle {
    height: 2.5rem;
    line-height: 2.5rem;
    margin-left: 1rem;
    border-radius: 1rem;
    margin-bottom: 0.5rem;
    color: #fff;
    font-size: .7rem;
    span {
      font-size: 1rem;
      margin-right: 0.5rem;
      margin-left: 0.5rem;
    }
  }
  ul {
    max-height: 60vh;
    overflow-y: auto;
    li {
      padding: 0 0.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom: 0.05rem solid #666;
      color: #fff;
      font-size: 0.6rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
