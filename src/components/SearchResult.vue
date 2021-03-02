<template>
  <!-- 搜索结果 -->
  <div class="result">
    <ul>
      <li v-for="(item,index) in result" :key="index">
        <SongItemList :item="item" :keyword="keyword" :allSongLists="result"></SongItemList>
      </li>
    </ul>
    <Loading v-if="isLoading"></Loading>
    <div class="loading" @click="loadingMove">加载更多</div>
  </div>
</template>

<script>
import SongItemList from "components/SongItemList";
import Loading from "components/Loading";
export default {
  data() {
    return {
      // suggestList:[]
      result: [],
      isLoading: true,
      page: 1,
    };
  },
  components: {
    SongItemList,
    Loading,
  },
  props: ["keyword"],
  created() {
    (this.result = []), this.loadSearch();
  },
  methods: {
    loadingMove() {
      this.page++;
      this.isLoading = true;
      this.loadSearch();
    },
    loadSearch() {
      this.$axios
        .get("http://musicapi.leanapp.cn/search?keywords=" +this.keyword +"&type=1&offset=" +(this.page - 1) * 30)
        .then((res) => {
          let ids = res.data.result.songs.map(data => {
            return data.id;
          })
          return ids.join(",");
        })
        .then(ids => {
          this.$axios.get("song/detail?ids=" + ids).then((res) => {
          this.isLoading = false
          res.data.songs.map((d) => {
            //处理数据和 SongItem不一致 转换数据
            d.song = {
              artists: d.ar,
            };
            this.result.push(d)
            return d;
          });
          // this.result = this.result.concat(res.data.songs);
        });
        })
    },
  },
};
</script>

<style  scoped>
.result {
  padding: 0 .5rem;
}
.loading {
  width: 100%;
  height: 1.5rem;
  text-align: center;
  color: #aaa;
}
</style>
