interface RequestOptions {
    baseURL?: string
    headers?: Record<string, string>
    timeout?: number
}

interface ResponseData<T = any> {
    code: number
    message: string
    result: boolean
    data: T
}

const defaultOptions: RequestOptions = {
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
}

// 请求拦截器
const requestInterceptor = (options: any) => {
    return options
}

// 响应拦截器
const responseInterceptor = (response: any) => {

    // 处理响应数据
    const data: ResponseData = response._data

    // 根据业务逻辑处理不同状态码
    if (data.code !== 200) {

        // 处理未登录等特殊情况
        if (data.code === 401) {
            navigateTo('/login')
        }

        return Promise.reject(data)
    }

    return data.data
}

// 错误处理
const errorHandler = (error: any) => {

    // 错误提示
    let errorMessage = '网络错误，请稍后重试'

    if (error.message.includes('timeout')) {
        errorMessage = '请求超时'
    } else if (error.response) {
        errorMessage = `请求失败: ${error.response.status}`
    }
    return Promise.reject(error)
}

// 创建请求实例
const createRequest = (options: RequestOptions = {}) => {
    const requestOptions = { ...defaultOptions, ...options }

    // 创建自定义fetch函数
    const fetchInstance = $fetch.create({
        baseURL: requestOptions.baseURL,
        headers: requestOptions.headers,
        timeout: requestOptions.timeout,
        onRequest: requestInterceptor,
        onResponse: responseInterceptor,
        onRequestError: errorHandler,
        onResponseError: errorHandler,
    })

    // 封装GET请求
    const get = async <T = any>(url: string, params?: any, config?: any) => {
        return fetchInstance<T>(url, {
            method: 'GET',
            params,
            ...config
        })
    }

    // 封装POST请求
    const post = async <T = any>(url: string, data?: any, config?: any) => {
        return fetchInstance<T>(url, {
            method: 'POST',
            body: data,
            ...config
        })
    }

    // 封装PUT请求
    const put = async <T = any>(url: string, data?: any, config?: any) => {
        return fetchInstance<T>(url, {
            method: 'PUT',
            body: data,
            ...config
        })
    }

    // 封装DELETE请求
    const del = async <T = any>(url: string, params?: any, config?: any) => {
        return fetchInstance<T>(url, {
            method: 'DELETE',
            params,
            ...config
        })
    }

    return {
        fetch: fetchInstance,
        get,
        post,
        put,
        del
    }
}

const request = createRequest()

export default function useRequest() {
    return request
}
