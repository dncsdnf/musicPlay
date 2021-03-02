<template>
  <div>
    <BorderTitle>推荐歌单</BorderTitle>
    <ul class="songList" v-if="newSongLists.length > 0">
      <ListItem v-for="item in songLists" :key="item.id" :item="item"></ListItem>
    </ul>
    <Loading v-if="songLists.length == 0"></Loading>
    <BorderTitle>最新音乐</BorderTitle>
    <ul class="newSong" v-if="newSongLists.length > 0">
      <li v-for="item in newSongLists" :key="item.id">
        <SongItemList :item="item" :allSongLists="newSongLists"></SongItemList>
      </li>
    </ul>
    <Loading v-if="newSongLists.length == 0"></Loading>
  </div>
</template>

<script>
import BorderTitle from "components/BorderTitle";
import ListItem from "components/ListItem";
import SongItemList from "components/SongItemList";
import Loading from "components/Loading";
export default {
  data() {
    return {
      songLists: [],
      newSongLists: []
    };
  },
  methods: {
  },
  components: {
    BorderTitle,
    ListItem,
    SongItemList,
    Loading
  },
  created() {
    // 请求推荐歌单的数据
    this.$axios.get("/personalized?limit=9")
      .then((res) => {
        this.songLists = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    // 请求最新音乐的数据
    this.$axios.get("/personalized/newsong?limit=20")
      .then((res) => {
        this.newSongLists = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
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
.newSong{
  padding: 0.5rem;
}
</style>
