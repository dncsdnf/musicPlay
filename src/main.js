import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/base.less'
import 'assets/monitor.js'

Vue.config.productionTip = false

//去重定义musicList为set数据结构
let musicList = new Set()
//全局定义一个musicStore对象,组件通过$root.musicStore访问
let musicStore = {
  musicId:null,
  musicList,
  currentMusic:null,
  playStyle:0
}
new Vue({
  data() {
    return{
      musicStore,
    }
  },
  watch:{},
  router,
  store,
  render: h => h(App)
}).$mount('#app')
