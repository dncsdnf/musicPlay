<template>
  <div class="boutique">
    <SlideShow></SlideShow>
    <BorderTitle>精品歌单</BorderTitle>
    <ul class="songList" v-if="songLists.length > 0">
      <ListItem v-for="item in songLists" :key="item.id" :item="item"></ListItem>
    </ul>
    <Loading v-if="songLists.length == 0"></Loading>
  </div>
</template>

<script>
import SlideShow from "components/SlideShow"
import BorderTitle from "components/BorderTitle";
import ListItem from "components/ListItem";
import Loading from "components/Loading";
export default {
  data () {
    return {
      songLists: [],
    }
  },
  created() {
    this.$axios.get("/top/playlist/highquality/tags").then(res => {
      this.songLists = res.data.playlists.splice(10)
    })
  },
  methods: {
    
  },
  components:{
    SlideShow,
    BorderTitle,
    ListItem,
    Loading
  }
}
</script>

<style lang="less" scoped>
.songList {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li{
    width: 33%;
  }
}
</style>
