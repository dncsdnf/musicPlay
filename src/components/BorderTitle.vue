<template>
<!-- 边框主题 -->
  <div>
    <h3><slot></slot></h3>
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
  h3{
    height: 2rem;
    line-height: 2rem;
    font-size: .7rem;
    &::before{
      content: "";
      display: inline-block;
      height: .6rem;
      border: .1rem solid #dd001b;
      margin-right: .5rem;
      line-height: .65rem;
    }
  }
</style>
