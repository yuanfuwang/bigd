import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import login from './modules/login'
import ma from './modules/ma'
import register from './modules/register'
import getPwd from './modules/getPwd'
import bigdLogin from './modules/bigdLogin'
import video from './modules/video'
import dic from './modules/dic'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    login,
    ma,
    register,
    getPwd,
    bigdLogin,
    video,
    dic
  },
  getters
})

export default store
