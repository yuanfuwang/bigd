import { submitRegisterInfo } from '../../api/register'
import { getToken, setToken, removeToken, setUserType } from '@/utils/auth'

const ma = {
    state: {
        loading: false
    },
    mutations: {
        SET_LOADING: (state, loadState) => {
            state.loading = loadState
        },
    },
    actions: {
        SubmitRegisterInfo({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                submitRegisterInfo(data).then(response => {
                    if (response.code === 0) {
                        //设置token
                        setToken(response.data.token)
                        //设置usertype
                        setUserType(response.data.type)
                        commit('SET_LOADING', false)
                        resolve(response.message)
                    }
                    if (response.code === -1) {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                    else {
                        commit('SET_LOADING', false)
                        reject(response.message)
                    }
                }).catch(error => {
                    commit('SET_LOADING', false)
                    reject('网络错误')
                })
            })
        },
    }
}

export default ma


