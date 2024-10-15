const menu = [
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
        key: '/back_way/display',
        label: '分类管理'
    },
    {
        key: '/back_way/complain',
        label: '投诉管理'
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
export default menu.map(item => {
    return {
        value: item.key,
        label: item.label
    }
})