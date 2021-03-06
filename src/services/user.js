import request from '../utils/request'

// 获取用户列表
export function getUserList(params) {
    return request('/api/userList', {
        method: 'get',
        params
    })
}

// 添加用户
export function addUser(data) {
    return request('/api/addUser', {
        method: 'post',
        data
    })
}

// 删除用户
export function delUser(params) {
    return request('/api/delUser', {
        method: 'get',
        params
    })
}

// 修改用户信息
export function updateUser(data) {
    return request('/api/updateUser', {
        method: 'post',
        data
    })
}

// 获取微信用户列表
export function getWeixinUserList(params) {
    return request('/api/getWeixinUserList', {
        method: 'get',
        params
    })
}
