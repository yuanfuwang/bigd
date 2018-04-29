import { checkVerificationCode, changePassword } from '../../api/getPwd'
import { setToken, setUserType } from '@/utils/auth'

const getPwd = {
    state: {
        loading: false
    },
    mutations: {
        SET_LOADING: (state, loadState) => {
            state.loading = loadState
        },
    },
    actions: {
        CheckVerificationCode({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                checkVerificationCode(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_LOADING', false)
                        resolve(response.data)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject('请输入正确的验证码')
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        },
        ChangePassword({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                changePassword(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_LOADING', false)
                        //设置token
                        setToken(response.data.token)
                        //设置usertype
                        setUserType(response.data.type)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        }
    }
}

export default getPwd
