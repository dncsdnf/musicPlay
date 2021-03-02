<template>
<!-- 搜索建议 -->
  <div class="suggest">
    <ul>
      <template v-if="suggestList.artists">
        <li v-for="item in suggestList.artists" :key="item.id" @click="$emit('change',item.name)">
          歌手:{{item.name}}
        </li>
      </template>
      <template v-if="suggestList.albums">
        <li v-for="item in suggestList.albums" :key="item.id" @click="$emit('change',item.name)">
          专辑:{{item.name}}
        </li>
      </template>
      <template v-if="suggestList.songs">
        <li v-for="item in suggestList.songs" :key="item.id" @click="$emit('change',item.name)">
          歌曲:{{item.name}}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      suggestList:[]
    }
  },
  props:["keyword"],
  created() {
    this.loading(this.keyword)
  },
  methods: {
    loading(val){
      this.$axios.get("http://musicapi.leanapp.cn/search/suggest?keywords="+val+"&type=mobile").then(res=>{
        // this.suggestList = [];
        let result = res.data.result;
        this.suggestList = result
      })
    }
  },
  watch:{
    keyword(val){
      this.loading(val)
    }
  }
}
</script>

<style lang="less" scoped>
  li{
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
  }
</style>
