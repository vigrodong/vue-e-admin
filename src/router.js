import Vue from 'vue'
import Router from 'vue-router'
import { LoadingBar } from 'iview';
import login from './views/login/login.vue'
import whole from './views/whole/whole.vue'
Vue.component('LoadingBar',LoadingBar)
Vue.use(Router)
const wholeRouter = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "about" */ './views/userMana/areaMana/area.vue')
  },
  {
    path: '/password',
    name: 'password',
    component: () => import(/* webpackChunkName: "about" */ './views/sysMana/password/password.vue')
  },
  {
    path: '/eduinst',
    name: 'eduinst',
    component: () => import(/* webpackChunkName: "about" */ './views/userMana/eduMana/eduMana.vue')
  },
  {
    path: '/school',
    name: 'school',
    component: () => import(/* webpackChunkName: "about" */ './views/userMana/schoolMana/schoolMana.vue')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ './views/userMana/index/index.vue')
  },
  {
    path:'/collection',
    name:'collection',
    component: () => import(/* webpackChunkName: "about" */ './views/userMana/index/tables/collectionTable.vue')
  }
]
const mainRouter = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/whole',
    name: 'whole',
    component: whole,
    children:[...wholeRouter]
  },
]
const router =  new Router({
  routes: [
    ...mainRouter
  ]
})
router.beforeEach((to, from, next) => {
  LoadingBar.start();
  let mainRouters = wholeRouter.map(target=>target.name);
  let outRouters = mainRouter.map(target=>target.name)
  if(to.path =='/' || to.name =='whole'){
    next({name:'about'});
  }
  if(mainRouters.includes(to.name) || outRouters.includes(to.name)){
    next();
  }else{
    next({name:'about'});
  }
})
router.afterEach((to, from)=>{
  LoadingBar.finish();
})

export default router