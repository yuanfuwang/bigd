import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  // 默认首页
  { path: '', redirect: '/index' },
  // 登陆
  { path: '/login', component: _import('login/index'), hidden: true },
  // 注册
  { path: '/register', component: _import('register/index'), hidden: true },
  // 首页 
  { path: '/index', component: _import('indexPage/index'), hidden: true },
  // 找回密码
  { path: '/getpwd', component: _import('getpwd/index'), hidden: true },

  //视频详情
  { path: '/videoList', component: _import('videoList/index'), hidden: true },

  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },

  // 后台登录
  { path: '/bigdlogin', component: _import('bigdLogin/index'), hidden: true },
  // 后台管理页面
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [{
      path: 'index',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/video',
    component: Layout,
    redirect: 'noredirect',
    name: 'videoPages',
    meta: {
      title: '课程相关',
      icon: '404'
    },
    children: [
      //上传视频
      { path: 'uploadVideo', component: _import('video/index'), name: 'uploadVideo', meta: { title: '课程列表', noCache: true, icon: '404' } },
      { path: 'videoType', component: _import('dic/index'), name: 'videoType', meta: { title: '课程分类字典', noCache: true, icon: '404' } },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
