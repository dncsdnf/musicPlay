<template>
<!-- 热门搜索 -->
  <div>
    <ul class="hotSearch">
      <h6>热门搜索</h6>
      <li v-for="(item,index) in hotSearch" :key="index" @click="$emit('change',item.first)">{{item.first}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotSearch: [],
    };
  },
  created() {
    this.$axios.get("/search/hot").then((res) => {
      this.hotSearch = res.data.result.hots;
    });
  },
};
</script>

<style lang="less" scoped>
.hotSearch {
  list-style: none;
  padding: 0 1rem;
  h6 {
    font-size: .6rem;
  }
  li {
    float: left;
    border: .05rem solid #ddd;
    font-size: .6rem;
    padding: .25rem;
    border-radius: .75rem;
    margin-right: .5rem;
    margin-top: .5rem;
  }
}
</style>
