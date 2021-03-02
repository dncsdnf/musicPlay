<template>
  <!-- 头部导航 -->
  <div>
    <div class="topfix">
      <h3>网酷音乐</h3>
    </div>
    <ul class="topNav" ref="topNav" :class="{fix:isFixed}">
      <li><router-link to="/recommend">推荐音乐</router-link></li>
      <li><router-link to="/boutique">精品音乐</router-link></li>
      <li><router-link to="/rankList">排行榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFixed:false
    }
  },
  mounted() {
    let offsetTop = this.$refs.topNav.offsetTop
    window.addEventListener("scroll" ,() => {
      let scrollTop = window.pageYOffset
      if(scrollTop >= offsetTop){
        this.isFixed = true
      }else this.isFixed = false
    })
  },
}
</script>

<style lang="less" scoped>
  .topfix{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 4rem;
    background: #d43c33;
    font-size: 1rem;
    color: #fff;
    letter-spacing:.15rem;
    text-align:center
  }
  .fix{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: #fff;
    width: 100vw;
    li{
      width: 25%;
    }
  }
  .topNav{
    display: flex;
    border-bottom: .05rem solid #ccc;
    // height: 2rem;
    align-items: center;
    li{
      flex: 1;
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      box-sizing: border-box;
      a{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        display: block;
        color: #333;
        text-decoration: none;
        font-size: .7rem;
        &.router-link-exact-active{
          color:#dd001b;
          border-bottom: .1rem solid #dd001b;
        }
      }
    }
  }
</style>
