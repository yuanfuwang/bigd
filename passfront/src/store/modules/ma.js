import { getMa } from '../../api/ma'

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
        GetMa({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                getMa(data).then(response => {
                    if (response.code === 0) {
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


