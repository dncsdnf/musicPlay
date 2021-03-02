<template>
<!-- 排行榜的排行 -->
  <div>
    <div v-if="playList" class="banner">
      <img :src="$route.query.pic">
      <span class="date">更新日期:{{playList.updateTime|formatDate}}</span>
    </div>
    <ul class="newSong" v-if="songs.length > 0">
      <li v-for="(item,index) in songs" :key="index">
        <div class="num">{{index+1 |formatNum}}</div>
        <SongItemList :item="item" :allSongLists="songs"></SongItemList>
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
      songs: [],
      playList: null,
      page:1,
      isLoading:true,
    };
  },
  components: {
    SongItemList,
    Loading
  },
  methods: {
    loadingMove(){
      this.page ++
      if(this.page > 10){
        return false
      }
      this.loading()
      this.isLoading = true
    },
    loading(){
      this.$axios
      .get("http://musicapi.leanapp.cn/playlist/detail?id=" + this.$route.params.id)
      .then((res) => {
        this.playList = res.data.playlist;
        let trackIds = this.playList.trackIds.slice((this.page-1)*20,this.page*20).map((data) => {
          return data.id;
        });
        return trackIds.join(",");
      })
      .then((trackIds) => {
        this.$axios.get("song/detail?ids=" + trackIds).then((res) => {
          this.isLoading = false
          res.data.songs.map((d) => {
            //处理数据和 SongItem不一致 转换数据
            d.song = {
              artists: d.ar,
            };
            this.songs.push(d)
            return d;
          });
        });
      })
    }
  },
  created() {
    this.loading();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.playList = null
      vm.$axios
        .get("http://musicapi.leanapp.cn/playlist/detail?id=" + to.params.id)
        .then((res) => {
          vm.playList = res.data.playlist;
          let trackIds = vm.playList.trackIds.slice(0,20).map((data) => {
            return data.id;
          });
          return trackIds.join(",");
        })
        .then((trackIds) => {
          vm.$axios.get("song/detail?ids=" + trackIds).then((res) => {
            let songDat = res.data.songs.map((d) => {
              //处理数据和 SongItem不一致 转换数据
              d.song = {
                artists: d.ar,
              };
              return d;
            });
            vm.songs = songDat;
            next()
          });
        })

    })
  },
  filters: {
    formatDate(val) {
      let date = new Date(val);
      return date.getMonth() + 1 + "月" + date.getDate() + "日";
    },
    formatNum(val) {
      return val < 10 ? "0"+val : val
    }
  },
};
</script>

<style lang="less" scoped>
.banner{
  position: relative;
  img{
    height: 8rem;
    width: 100%;
  }
  .date{
    position: absolute;
    left: 50%;
    top: 1rem;
    transform: translateX(-50%);
    color: #fff;
  }
}
  .newSong{
    li{
      display: flex;
      align-items: center;
      &:nth-child(-n+3) .num{
          color: red;
      }
      .num{
        // padding-left: 10px;
        width: 2rem;
        text-align: center;
        height: 100%;
      }
    }
  }
  .loading{
    width: 100%;
    height: 1.5rem;
    text-align: center;
    color: #aaa;
  }
</style>
