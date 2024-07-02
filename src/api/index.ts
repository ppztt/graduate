import axios from 'axios'

axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
axios.defaults.timeout = 2000

axios.interceptors.request.use(config => {
    // 在这里最主要的还是为请求头添加东西，最常见的就是token，后面是文件下载请求，可以改为blob
    config.headers.Authorization = window.localStorage.getItem('token') || ''
    return config
})

axios.interceptors.response.use(
    res => {
        // 这部分可以做正常请求完数据后要做的事
        if (res.headers.authorization && res.headers.authorization !== '') {
            localStorage.setItem('token', res.headers.authorization)
        }
        return res.data
    },
    err => {
        // 400：Bad Request（错误的请求）：可能是由于无效的请求参数或格式不正确引起的。你可以根据具体的错误信息进行处理或向用户提供适当的提示。
        // 401：Unauthorized（未授权）：表示请求缺乏身份验证信息或凭据无效。你可以尝试刷新令牌或将用户重定向到登录页面。
        // 403：Forbidden（禁止访问）：表示服务器拒绝了请求。可能是由于权限不足或访问受限引起的。你可以向用户显示适当的错误消息或采取其他适当的措施。
        // 404：Not Found（未找到）：表示请求的资源不存在。你可以根据业务需求决定如何处理，可以显示友好的页面或进行其他处理。
        // 500：Internal Server Error（服务器内部错误）：表示服务器在处理请求时发生了错误。这可能是由于服务器端代码故障引起的。你可以记录错误日志并向用户显示适当的错误消息。
        // 其他状态码：根据需要，你可能还需要处理其他状态码，例如重定向（3xx）、成功响应（2xx）等。
        let msg = '返回错误'
        if (err.response.status.includes(50) !== -1) {
            msg = "服务器错误"
        }
        if (err.response.status.includes(40) !== -1) {
            msg = '客户端错误'
        }
        if (err.response.status.includes(30) !== -1) {
            msg = '被重定向了'
        }
        return Promise.reject(msg)
    }
)

// 发送请求 (接口路径，参数，请求配置)
export const post: Function = (url: string, params: any, config?: any) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params, config).then(
            (res: any) => {
                resolve(res)
            },
            (rej: any) => {
                reject(rej)
            }
        ).catch((err: any) => {
            reject(err)
        })
    })
}

export const put: Function = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        axios.put(url, params).then(
            (res: any) => {
                resolve(res)
            }, (err: any) => {
                reject(err)
            }
        ).catch((err: any) => {
            reject(err)
        })
    })
}

export const get: Function  = (url: string, params: any, config?: any) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
            ...config
        }).then(
            (res: any) => {
            resolve(res)
        }
    ).catch(
        (err: any) => {
            reject(err)
        }
    )
    })
}

export const del: Function = (url: string, params: any) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params,
            data: {
                ...params
            }
        }).then((res: any) => {
            resolve(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}

export const patch: Function = (url: string, params: any, config?: any) => {
    return new Promise((resolve, reject) => {
        axios.patch(url, params, config).then(
            (res: any) => {
                resolve(res)
            }, (err: any) => {
                reject(err)
            }
        ).catch((err: any) => {
            reject(err)
        })
    })
}
