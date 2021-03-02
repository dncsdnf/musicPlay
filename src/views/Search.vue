<template>
  <div>
    <div class="search">
      <i></i>
      <input type="text" v-model="keyword" placeholder="搜索歌曲 歌手 专辑" @input="inputing=true"/>
    </div>
    <component :is='search' :keyword="keyword" @change="change"></component>
  </div>
</template>

<script>
import HotSearch from "components/HotSearch";
import SearchSuggest from "components/SearchSuggest";
import SearchResult from "components/SearchResult";
export default {
  data() {
    return {
      search:"HotSearch",
      keyword:"",
      inputing:false//用来判断输入框是否正在输入值
    };
  },
  created() {},
  methods: {
    change(val){
      this.keyword = val
      this.inputing = false
      this.search = "SearchResult"
    }
  },
  watch:{
    keyword(val){
      if(val == ""){
        this.search = "HotSearch"
      }else if(this.inputing){
        this.search = "SearchSuggest"
      }
    }
  },
  components: {
    HotSearch,
    SearchSuggest,
    SearchResult
  },
};
</script>

<style lang="less" scoped>
.search {
  position: relative;
  width: 90%;
  height: 30px;
  padding: 0 30px;
  box-sizing: border-box;
  background: #ebecec;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin: 0 30px;
  margin-top: 20px;
  margin-bottom: 30px;
  i {
    position: absolute;
    left: 0;
    top: 9px;
    margin: 0 8px;
    vertical-align: middle;
    width: 13px;
    height: 13px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
  }
  input {
    flex: 1;
    background-color: transparent;
    outline: none;
    border: none;
    width: 100%;
    height: 30px;
    line-height: 18px;
    background: rgba(0, 0, 0, 0);
    font-size: 14px;
    color: #333;
  }
}
</style>
