<template>
  <div class="loading"> 
    <div>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .loading{
    div{
      width: 1rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      i{
        display: inline-block;
        width: .2rem;
        height: 1rem;
        background: red;
        transform-origin: bottom;
        animation: loading linear infinite 0.5s 0s alternate-reverse;
        &:nth-of-type(2){
          animation-delay: -0.1s;
        }
        &:nth-of-type(3){
          animation-delay: -0.3s;
        }
      }
    }
  }
  @keyframes loading{
    from{
      transform: scaleY(0.4);
    }
    to{
      transform: scaleY(1.2);
    }
  }
</style>
