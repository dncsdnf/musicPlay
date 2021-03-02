<template>
  <!-- 歌单里面的歌曲列表 -->
  <div>
    <div class="head" :style="`backgroundImage:url(${playlist.coverImgUrl})`">
      <div class="left">
        <div class="icon">歌单</div>
        <img :src="playlist.coverImgUrl" />
        <span>{{playlist.playCount | formatCount}}万</span>
      </div>
      <div class="right">
        <p>{{playlist.name}}</p>
      </div>
    </div>
    <div class="word">歌曲列表</div>
    <ul>
      <li v-for="(item,index) in songs" :key="item.id">
        <div class="num">{{index+1}}</div>
        <SongItemList :item="item" :allSongLists="songs"></SongItemList>
      </li>
    </ul>
  </div>
</template>

<script>
import SongItemList from "components/SongItemList";
export default {
  data() {
    return {
      playlist: "",
      songs: "",
    };
  },
  components: {
    SongItemList,
  },
  filters: {
    formatCount(val) {
      return (val / 10000).toFixed(2);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$axios
        .get("/playlist/detail?id=" + vm.$route.params.id)
        .then((res) => {
          console.log(res);
          vm.playlist = res.data.playlist;
          let trackIds = vm.playlist.trackIds.slice(0, 20).map((data) => {
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
            next();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
};
</script>

<style lang="less" scoped>
.head {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem .5rem 1.5rem .75rem;
  &::after {
    content: " ";
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
  }
  .left {
    flex: 1;
    position: relative;
    .icon {
      position: absolute;
      z-index: 3;
      top: .5rem;
      left: 0;
      padding: 0 .4rem;
      height: .85rem;
      color: #fff;
      font-size: .45rem;
      text-align: center;
      line-height: .85rem;
      background-color: rgba(217, 48, 48, 0.8);
      border-top-right-radius: .85rem;
      border-bottom-right-radius: .85rem;
    }
    span {
      position: absolute;
      top: .5rem;
      right: .5rem;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
      background-repeat: no-repeat;
      background-position-y: .15rem;
      background-size: .6rem;
      color: #fff;
      text-shadow: 0px 0px 2px #000;
      padding-left: .7rem;
      font-size: .6rem;
    }
  }
  .right {
    flex: 2;
    margin-left: 1rem;
    color: #fff;
  }
}
.word {
  margin: .25rem;
  font-size: .6rem;
  color: #333;
}
ul {
  margin: .25rem;
  li {
    display: flex;
    align-items: center;
    .num {
      // padding-left: 10px;
      width: 2rem;
      text-align: center;
      height: 100%;
      color: #999;
    }
  }
}
</style>
