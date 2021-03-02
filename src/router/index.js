import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/recommend"
  },
  {
    path:"/recommend",
    component:() => import("views/Recommend")
  },
  {
    path:"/boutique",
    component:() => import("views/Boutique")
  },
  {
    path:"/rankList",
    component:() => import("views/RankList"),
  },
  {
    path:"/musicDetail/:id",
    component:() => import("components/MusicDetail")
  },
  {
    path:"/search",
    component:() => import("views/Search")
  },
  {
    path:"/playlist/:id",
    component:() => import("components/PlayList")
  },
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
