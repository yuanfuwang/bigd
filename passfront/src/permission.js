import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken, getUserType } from '@/utils/auth' // getToken from cookie
import { asyncRouterMap, constantRouterMap } from '@/router'


NProgress.configure({ showSpinner: false })// NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/register', '/index', '/getpwd', '/bigdlogin']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  debugger
  // 如果有token
  if (getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {  // 在免登录白名单，直接进入
      next()
    }

    // 如果有token并且跳转login画面，则跳转会index画面
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }

    //如果有token并且跳转bigdLogin画面并且usertype===99，则跳转会后台管理画面
    //
    //
    //

    // 如果有token并且跳转后台管理，
    else if (to.path === '/dashboard/index') {
      // 如果usertype==99，则可以访问
      if (getUserType() === '99') {
        if (store.getters.addRouters.length === 0) {
          store.dispatch('GenerateRoutes', 'admin').then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }
        else {
          next()
        }
      }
      // usertype !== 99，无访问权限
      else {
        debugger
        // 跳转401页面
        next({ path: '/401' })
        NProgress.done()
      }
    }
    // 如果有token并且跳转其他路径
    else {
      if (getUserType() === '99') {
        if (store.getters.addRouters.length === 0) {
          store.dispatch('GenerateRoutes', 'admin').then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        } else {
          next()
        }
      }
      // 不是管理员访问其他路径
      else {
        let result = false;
        for (let i in constantRouterMap) {
          if (constantRouterMap[i].path === to.path || constantRouterMap[i].redirect === to.path) {
            result = true
            next();
          }
        }
        if (result === false) {
          next({ path: '/404', replace: true, query: { noGoBack: true } })
        }
      }
    }
  }
  // 如果没有token
  else {
    if (whiteList.indexOf(to.path) !== -1) {  // 在免登录白名单，直接进入
      next()
    }
    else { // 不在免登录白名单，重定向到登录页
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
