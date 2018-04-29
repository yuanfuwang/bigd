import { selectParentType, createParentType } from '../../api/dic'

const dic = {
    state: {
        loading: false,
        tempData: []
    },
    mutations: {
        SET_LOADING: (state, loadState) => {
            state.loading = loadState
        },
        SET_TEMPDATA: (state, loadState) => {
            state.tempData = loadState
        },
        SET_ADDTEMPDATA: (state, loadState) => {
            debugger
            for (let i in state.tempData) {
                if (state.tempData[i].key === loadState.parentid) {
                    for (let j in loadState.data) {
                        delete loadState.data[j]['child']
                        state.tempData[i].child.push(loadState.data[j])
                    }
                }
            }
        }
    },
    actions: {
        SelectParentType({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                selectParentType(data).then(response => {
                    if (response.code === 0) {
                        //response -》tree node
                        let result = [];
                        for (let i in response.data) {
                            let temp = { label: response.data[i].categoryName, key: response.data[i].id };
                            result.push(temp);
                        }
                        commit('SET_LOADING', false)
                        resolve(result)
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
        },
        SelectByParentId({ commit }, data) {
            return new Promise((resolve, reject) => {
                selectParentType(data).then(response => {
                    if (response.code === 0) {
                        //response -》tree node
                        let result = [];
                        for (let i in response.data) {
                            let temp = { label: response.data[i].categoryName, key: response.data[i].id, child: [] };
                            result.push(temp);
                        }

                        debugger

                        if (data) {
                            commit('SET_ADDTEMPDATA', { data: result, parentid: data })
                        } else {
                            commit('SET_TEMPDATA', result)
                        }


                        // commit('SET_TEMPDATA', result)
                        commit('SET_LOADING', false)
                        resolve(result)
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
        },
        CreateParentType({ commit }, data) {
            commit('SET_LOADING', true)
            return new Promise((resolve, reject) => {
                createParentType(data).then(response => {
                    if (response.code === 0) {
                        commit('SET_LOADING', false)
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

export default dic