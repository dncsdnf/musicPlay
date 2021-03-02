<template>
  <!-- 轮播图 -->
  <div class="slideShow">
    <transition-group tag="ul" :name="direction">
      <li v-for="(item,index) in imgs" :key="item.id" v-show="currentIndex == index" @click="start">
        <router-link :to="`/playlist/${item.id}`">
          <div>
            <img :src="item.coverImgUrl" />
            <span>{{item.playCount | formatCount}}万</span>
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </li>
    </transition-group>
    <ol>
      <li
        v-for="i in 10"
        :style="{backgroundColor:currentIndex == i-1 ? activecolor : normalcolor}"
        @click="change(i)"
        :key="i"
      ></li>
    </ol>
    <div class="left" @click="move1">&lt;</div>
    <div class="right" @click="move2">&gt;</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [],
      direction: "level",
      normalcolor: "rgba(255, 255, 255, 0.7)",
      activecolor: "red",
      currentIndex: 0,
      timer:null,
      isClear:false
    };
  },
  methods: {
    move1() {
      if (this.direction == "level") {
        this.direction = "level-right";
      }
      this.currentIndex--;
      this.currentIndex < 0 ? (this.currentIndex = this.imgs.length - 1) : this.currentIndex;
      clearInterval(this.timer)
      this.isClear = true
    },
    move2() {
      if (this.direction == "level-right") {
        this.direction = "level";
      }
      this.currentIndex++;
      this.currentIndex > this.imgs.length - 1 ? (this.currentIndex = 0) : this.currentIndex;
      clearInterval(this.timer)
      this.isClear = true
    },
    change(index) {
      if (this.currentIndex > index - 1) {
        if (this.direction == "level") {
          this.direction = "level-right";
        }
      } else {
        if (this.direction == "level-right") {
          this.direction = "level";
        }
      }
      this.currentIndex = index - 1;
      clearInterval(this.timer)
      this.isClear = true
    },
    start(){
      if(this.isClear == true){
        this.timer = setInterval(() => {
          this.currentIndex ++
          this.currentIndex > this.imgs.length - 1 ? (this.currentIndex = 0) : this.currentIndex;
        },1500)
      }
    }
  },
  created() {
    this.$axios.get("/top/playlist/highquality/tags?limit=10").then(res => {
      this.imgs = res.data.playlists
    })
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentIndex ++
      this.currentIndex > this.imgs.length - 1 ? (this.currentIndex = 0) : this.currentIndex;
    },1500)
  },
  filters: {
    formatCount(val) {
      return (val / 10000).toFixed(2);
    },
  },
};
</script>

<style lang="less" scoped>
.slideShow {
  width: 100%;
  height: 10rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  ul,
  ol {
    list-style: none;
  }
  ul {
    li {
      width: 100%;
      height: 10rem;
      position: absolute;
      left: 0;
      top: 0;
      /* transition: all 2s; */
      a{
        div {
          position: relative;
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
          p {
            position: absolute;
            left: 50%;
            top: 5rem;
            transform: translateX(-50%) translateY(-50%);
            text-decoration: none;
            font-size: .8rem;
            color: #ddd;
          }
          img{
            width: 100%;
            height: 15rem;
          }
        }
      }
    }
  }
  ol {
    position: absolute;
    left: 50%;
    bottom: .5rem;
    transform: translateX(-50%);
    height: 1.5rem;
    width: 10.5rem;
    &::after{
      content: "";
      display: block;
      clear: both;
    }
    li {
      width: .75rem;
      height: .75rem;
      border-radius: 50%;
      /* background-color: rgba(255, 255, 255, 0.7); */
      float: left;
      cursor: pointer;
      margin: .15rem;
    }
  }
  .left,.right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    width: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
    font-size: .8rem;
    cursor: pointer;
  }
  .left {
    left: 0;
    border-radius: 0 .5rem .5rem 0;
  }

  .right {
    right: 0;
    border-radius: .5rem 0 0 .5rem;
  }

  /* 左右移动 左到右*/
  .level-enter {
    transform: translateX(-100%);
  }

  .level-enter-to,
  .level-leave {
    transform: translateX(0);
  }

  .level-enter-active,
  .level-leave-active {
    transition: all 1s;
  }

  .level-leave-to {
    transform: translateX(100%);
  }

  /* 左右移动 右到左*/
  .level-right-enter {
    transform: translateX(100%);
  }

  .level-right-enter-to,
  .level-leave {
    transform: translateX(0);
  }

  .level-right-enter-active,
  .level-right-leave-active {
    transition: all 1s;
  }

  .level-right-leave-to {
    transform: translateX(-100%);
  }
}


</style>
