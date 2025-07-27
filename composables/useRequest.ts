interface RequestOptions {
    baseURL?: string
    headers?: Record<string, string>
    timeout?: number
    credentials?: string
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
    credentials: 'include'
}

// 请求拦截器
const requestInterceptor = ({ options }: { options: any}) => {
    if (!options.headers.get('Authorization')) {
        options.headers.set('Authorization', window.localStorage.getItem('token') || '')
    }
    return options
}

// 响应拦截器
const responseInterceptor = ({ response }: { response: any }) => {
    if (response.headers.get('Authorization')) {
        window.localStorage.setItem('token', response.headers.get('Authorization'))
    }
    const data: ResponseData = response._data

    return data.data
}

// 错误处理
const errorHandler = (error: any) => {
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
