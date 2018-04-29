import { adminUserLogin } from '../../api/bigdLogin'
import { setToken, setUserType, getToken } from '@/utils/auth'

const bigdLogin = {
    state: {
        loginLoading: false,
        token: getToken(),
    },
    mutations: {
        SET_LOGINLOADING: (state, loadState) => {
            state.loginLoading = loadState
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        AdminUserLogin({ commit }, data) {
            commit('SET_LOGINLOADING', true)
            return new Promise((resolve, reject) => {
                adminUserLogin(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_TOKEN', response.data.token)
                        //设置token
                        setToken(response.data.token)
                        //设置usertype
                        setUserType(response.data.type)
                        commit('SET_LOGINLOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOGINLOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOGINLOADING', false)
                    reject("创建失败")
                })
            })
        }
    }
}

export default bigdLogin
