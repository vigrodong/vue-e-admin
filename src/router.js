import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login/login.vue'
import whole from './views/whole/whole.vue'

Vue.use(Router)
const wholeRouter = [
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  },
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

export default router