<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <!-- r表示半径，cx 和 cy 属性定义圆点的 x 和 y 坐标 fill表示背景色 -->
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dashArray: Math.PI * 100, //圆的周长
    };
  },
  props:{
    radius: {
        type: String,
        default: '0.32rem'
      },
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray;
    },
  },
}
</script>

<style lang="less" scoped>
  .progress-circle{
    position: relative;
    circle{
      stroke-width: .4rem;
      transform-origin: center;
      &.progress-background{
        transform: scale(0.9);
        stroke: rgba(0, 0, 0, 0.3);
      }
      &.progress-bar{
        //stroke-dashoffset一个特别之处是：它的起点是垂直居中，水平方向为右。为了得到想要的效 果，有必要对圆形进行负值的旋转。
        transform: scale(0.9) rotate(-90deg);
        stroke: #ff0000;
      }
    }
  }
</style>
