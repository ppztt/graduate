const { post } = useRequest()

export default {
    login: (params: object) => {
        return post('/back_way/user/login', params)
    }
}