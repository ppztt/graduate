
interface State {
    userInfo: object,
    isLogin: boolean
  }
export default({
  namespaced: true,
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {
    updateUserInfos(state: State, data: object) {
        state.userInfo = Object.assign({}, data)
    },
    isLogin(state: State, data: boolean) {
      state.isLogin = data
    }
  },
  actions: {
    updateUserInfo({ commit, state, dispatch }, data: any) {
        commit('updateUserInfos', data)
    }
  }
})
