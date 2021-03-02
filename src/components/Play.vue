<template>
  <!-- 播放 -->
  <transition enter-active-class="animate__animated animate__backInLeft">
    <div class="player" v-if="$root.musicStore.musicId">
      <!-- 播放器 -->
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${$root.musicStore.musicId}.mp3`"
        autoplay
        @timeupdate="timeUpdate"
        ref="audio"
        @ended="endPlay"
      ></audio>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <List v-if="isShow" @changeIcon="changeIcon"></List>
      </transition>
      <div class="playBar">
        <i ref="randImg" @click="isFullPage = true">
          <img :src="$root.musicStore.currentMusic.picUrl||$root.musicStore.currentMusic.al.picUrl" />
        </i>
        <i @click="isFullPage = true">{{$root.musicStore.currentMusic.name}}</i>
        <i><ProgressCircle :radius="`35px`" :percent="percent"><span class="iconfont icon-mini" @click="changePlay()">{{isPlay?'&#xe61f;':'&#xe681;'}}</span></ProgressCircle></i>
        <i>
          <span class="iconfont" @click="isShow=!isShow">&#xe504;</span>
        </i>
      </div>
      <transition
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div class="fullPage" v-show="isFullPage">
          <div class="head">
            <div @click="isFullPage = false" class="back">&lt;</div>
            <div class="name">
              <p>{{$root.musicStore.currentMusic.name}}</p>
              <p>{{$root.musicStore.currentMusic.song.artists[0].name||$root.musicStore.currentMusic.ar[0].name}}</p>
            </div>
          </div>
          <div class="lyric" :style="{height:lyricHeight}">
            <ul :style="`transform:translateY(-${moveLength}px)`">
              <li
                v-for="(item,index) in lyric"
                :key="index"
                :style="{color:index == lyricIndex?'red':''}"
                ref="lis"
              >{{item.lyric}}</li>
            </ul>
          </div>
          <div class="progress">
            <input type="range" min="0" :max="duration" :value="currentTime" @change="changeTime" />
            <i :style="`width:${(currentTime/duration)*80}vw`"></i>
          </div>
          <div class="controls">
            <div class="play">
              <span class="iconfont prev" @click="prev">&#xe6b8;</span>
              <span class="iconfont start" @click="changePlay()">{{isPlay?'&#xe625;':'&#xe606;'}}</span>
              <span class="iconfont next" @click="next">&#xe613;</span>
            </div>
            <div class="musicList">
              <span class="iconfont" @click="is=!is">&#xe61a;</span>
            </div>
            <transition
              enter-active-class="animate__animated animate__fadeInUp"
              leave-active-class="animate__animated animate__fadeOutDown"
            >
              <List v-if="is" @changeIcon="changeIcon"></List>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import List from "components/List";
import ProgressCircle from "components/ProgressCircle";
export default {
  name: "Play",
  data() {
    return {
      isPlay: true, //是否播放
      isFullPage: false, //是否全屏
      duration: 0, //歌曲总时间
      currentTime: 0, //当前播放时间
      isShow: false, //是否显示
      is: false, //歌单是否显示
      currentIndex: 0, //当前歌曲下标
      lyric: null, //歌词
      lyricIndex: 0, //当前歌词下标
      moveLength: 0, //移动的距离
      mode: "", //播放模式
      lyricHeight: 80,
    };
  },
  components: {
    List,
    ProgressCircle
  },
  mounted() {
    window.onresize = () => {
      this.lyricHeight = window.innerHeight - 160 + "px";
    };
  },
  methods: {
    getIndex() {
      let musicList = this.$root.musicStore.musicList;
      [...musicList].forEach((item, index) => {
        if (item.id == this.$root.musicStore.musicId) {
          this.currentIndex = index;
        }
      });
    },
    endPlay() {
      this.next()
    },
    prev() {
      this.getIndex();
      let musicList = [...this.$root.musicStore.musicList];
      let playStyle = this.$root.musicStore.playStyle 
      if(playStyle == 0 || playStyle == 2){
        this.currentIndex--;
        this.currentIndex < 0
          ? (this.currentIndex = musicList.length - 1)
          : this.currentIndex;
      }
      if(playStyle == 1){
        this.currentIndex = Math.min(Math.random()*musicList.length)
      }
      this.$root.musicStore.musicId = musicList[this.currentIndex].id;
      this.$root.musicStore.currentMusic = musicList[this.currentIndex];
    },
    next() {
      this.getIndex();
      let musicList = [...this.$root.musicStore.musicList];
      let playStyle = this.$root.musicStore.playStyle
      if(playStyle == 0 || playStyle == 2){
        this.currentIndex++;
      this.currentIndex >= musicList.length
        ? (this.currentIndex = 0)
        : this.currentIndex;
      }
      if(playStyle == 1){
        this.currentIndex = Math.floor(Math.random()*musicList.length)
      }
      
      this.$root.musicStore.musicId = musicList[this.currentIndex].id;
      this.$root.musicStore.currentMusic = musicList[this.currentIndex];
    },
    changeTime(event) {
      let time = event.target.value;
      this.currentTime = time;
      this.$refs.audio.currentTime = time;
    },
    changePlay() {
      let audio = this.$refs.audio;
      let randImg = this.$refs.randImg;
      if (this.isPlay) {
        audio.pause();
        this.isPlay = false;
        //animation动画暂停
        randImg.style.animationPlayState = "paused";
      } else {
        //animation动画播放
        audio.play();
        this.isPlay = true;
        randImg.style.animationPlayState = "running";
      }
    },
    timeUpdate(event) {
      let audio = event.target;
      let currentTime = audio.currentTime;
      let duration = audio.duration;
      this.duration = duration;
      this.currentTime = currentTime;
      for (let index = 0; index < this.lyric.length; index++) {
        if (index >= this.lyric.length - 1) {
          this.lyricIndex = index;
          break;
        }
        if (
          currentTime > this.lyric[index].time &&
          currentTime < this.lyric[index + 1].time
        ) {
          if (index > 0) {
            this.moveLength = this.$refs.lis[index - 1].offsetTop;
          }
          this.lyricIndex = index;
          break;
        }
      }
    },
    changeIcon(value){
      this.isPlay = value
    }
  },
  computed: {
    musicIds() {
      let musicIds = this.$root.musicStore.musicId;
      return musicIds;
    },
    percent(){
      return Math.min(1,this.currentTime/this.duration)
    }
  },
  watch: {
    musicIds(value) {
      this.$axios.get("/lyric?id=" + value).then((res) => {
        let arr = res.data.lrc.lyric.split("\n");
        let reg = /\[(\d+):(\d+\.\d+)\](.+)/;
        let newArr = arr.filter((item) => {
          return reg.test(item);
        });
        this.lyric = newArr.map((item) => {
          if (reg.test(item)) {
            return {
              time: parseInt(RegExp.$1 * 60) + parseFloat(RegExp.$2),
              lyric: RegExp.$3,
            };
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  z-index: 9;
  bottom: 0px;
  background: #fff;
  border-top: 1px solid #666;
  width: 100%;
  font-size: .6rem;
  audio {
    height: 2.5rem;
  }
  .playBar {
    display: flex;
    align-items: center;
    padding: .25rem .5rem;
    i {
      &:first-of-type {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        overflow: hidden;
        animation: randImg 5s infinite linear;
      }
      &:nth-of-type(2) {
        flex: 1;
        text-align: center;
        font-style: normal;
        line-height: 2rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:nth-of-type(3) {
        position :relative;
        margin-right: 5px;
        .icon-mini{
          font-size: 1rem;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-45%) translateY(-60%);
          font-weight: bold;
        }
      }
      &:nth-of-type(4) {
        span {
          font-size: 1.5rem;
        }
      }
    }
  }
  .fullPage {
    height: 100vh;
    width: 100vw;
    background: url("../assets/music-bg.jpg") no-repeat;
    background-size: cover;
    background-position: 50%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    .head {
      display: flex;
      text-align: center;
      position: relative;
      height: 3rem;
      .back {
        align-self: center;
        width: 10%;
        font-size: 1.5rem;
        color: #fff;
      }
      .name {
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        p:first-of-type {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        p:nth-of-type(2) {
          color: #666;
          font-size: .6rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .lyric {
      height: 72vh;
      overflow: hidden;
      ul {
        text-align: center;
        color: #fff;
        transition: all 1s;
        li {
          line-height: 1.5rem;
          margin-bottom: 1rem;
        }
      }
    }
    .progress {
      width: 80vw;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      bottom: 3.5rem;
      input {
        width: 100%;
        background: transparent;
        //去除默认样式
        appearance: none;
        -webkit-appearance: none;
        position: relative;
        z-index: 2;
        // 控制滑头
        &::-webkit-slider-thumb {
          //去除默认样式
          appearance: none;
          -webkit-appearance: none;
          width: 1rem;
          height: 1rem;
          margin-top: -.25rem;
          border-radius: 50%;
          background: #fff;
        }
        //控制滑槽
        &::-webkit-slider-runnable-track {
          //去除默认样式
          appearance: none;
          -webkit-appearance: none;
          height: .5rem;
          border-radius: .25rem;
          background: rgba(red, 0, 0, 1);
          box-shadow: inset 0px 10px 10px rgba(255, 255, 255, 0.3);
        }
      }
      i {
        position: absolute;
        width: 2.5rem;
        height: .5rem;
        background: rgba(255, 255, 255, 0.7);
        left: 0;
        top: .2rem;
        z-index: 1;
        border-radius: .25rem;
      }
    }
    .controls {
      width: 100vw;
      height: 3.2rem;
      position: fixed;
      bottom: 0;
      left: 0;
      span {
        font-size: 1.25rem;
      }
      .play {
        position: absolute;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        height: 3.2rem;
        width: 8.6rem;
        overflow: hidden;
        .start {
          font-size: 2.5rem;
          margin: 0 1rem;
          float: left;
          margin-top: .25rem;
        }
        .prev,
        .next {
          float: left;
          border: .15rem solid #000;
          border-radius: 50%;
          padding: .25rem;
          margin-top: .5rem;
        }
      }
      .musicList {
        position: absolute;
        right: 1rem;
        bottom: .4rem;
        span {
          font-size: 2rem;
        }
      }
    }
  }
}
@keyframes randImg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
