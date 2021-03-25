import request from '../utils/request'

export function login(params) {
    return request('/api/login', {
        method: 'post',
        data: params
    })
}

// 获取用户信息
export function user() {
    return request('/api/user', {
        method: 'get'
    })
}
