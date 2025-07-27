import { defineStore } from "pinia"
interface State {
    userInfo: { user_name: string; level: number; [key: string]: any}
    isLogin: boolean
    commonUserInfo: Object
    menu_list: Array<{key: string; label: string}>
  }
export const useUserStore = defineStore('user', {
  state: (): State => ({
    userInfo: {user_name: '', level: 0},
    commonUserInfo: {},
    isLogin: false,
    menu_list: [
      {
        key: '/back_way/dash_board',
        label: '数据中心'
      },
      {
        key: '/back_way/content',
        label: '文章管理'
      },
      {
        key: '/back_way/merchant',
        label: '商家管理'
      },
      {
        key: '/back_way/complain',
        label: '投诉管理'
      },
      {
        key: '/back_way/display',
        label: '分类管理'
      },
      {
        key: '/back_way/user_manage',
        label: '用户管理'
      },
      {
        key: '/back_way/role_manage',
        label: '角色管理'
      },
      {
        key: '/back_way/person',
        label: '个人中心'
      }
    ]
  }),
  actions: {
    updateUserInfo(data: any) {
      this.userInfo = Object.assign({}, data)
      localStorage.setItem('userInfo', JSON.stringify(data))
    },
    updateCommonUserInfo(data: any) {
        this.userInfo = Object.assign({}, data)
        localStorage.setItem('commonUserInfo', JSON.stringify(data))
    },
    updateIsLogin(data: boolean) {
      this.isLogin = data
    }
  }
})
