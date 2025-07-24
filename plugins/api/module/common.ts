const request = useRequest()

export default {
    login: (params: object) => {
        return request.post('/back_way/user/login', params)
    }
}