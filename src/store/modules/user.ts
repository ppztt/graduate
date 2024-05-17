
interface State {
    userInfo: object,
    isLogin: boolean,
    commonUserInfo: Object
  }
export default({
  namespaced: true,
  state: {
    userInfo: {},
    commonUserInfo: {},
    isLogin: false
  },
  mutations: {
    updateUserInfos(state: State, data: object) {
        state.userInfo = Object.assign({}, data)
        localStorage.setItem('userInfo', JSON.stringify(data))
    },
    updateCommonUserInfos(state: State, data: object) {
      state.userInfo = Object.assign({}, data)
      localStorage.setItem('commonUserInfo', JSON.stringify(data))
  },
    isLogin(state: State, data: boolean) {
      state.isLogin = data
    }
  },
  actions: {
    updateUserInfo({ commit }: any, data: any) {
        commit('updateUserInfos', data)
    },
    updateCommonUserInfo({ commit }: any, data: any) {
      commit('updateCommonUserInfos', data)
  }
  }
})
