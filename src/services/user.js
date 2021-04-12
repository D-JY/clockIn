import request from '../utils/request'

export function getUserList(params) {
    return request('/api/userList', {
        method: 'get',
        params
    })
}
