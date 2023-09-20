import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children:[
      {
        path: '/about/list',
        name: 'about',
        component: () => import('../views/list.vue'),
      }
    ]
  },{
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  let token=localStorage.getItem('token');
  if(!token&&to.path!=='/login'){
     next('/login');
  }else{
    next();
  }
})
export default router
