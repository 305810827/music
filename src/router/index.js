import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/songSheet/:songSheet_id',
    name: 'songSheet',
    component: () => import('../views/songSheet.vue')
  },
  {
	  path:'/play',
	  name:'play',
	  component: () => import('../views/play.vue')
  },
  {
  	  path:'/commit',
  	  name:'commit',
  	  component: () => import('../views/commit.vue')
  },
  {
  	  path:'/searchBefore',
  	  name:'searchBefore',
  	  component: () => import('../views/searchBefore.vue')
  },
  {
  	  path:'/search',
  	  name:'search',
  	  component: () => import('../views/search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
