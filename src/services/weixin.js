import request from '../utils/request'

// 创建微信自定义菜单
export function createMenu(data) {
    return request('/weixin/createMenu', {
        method: 'post',
        data
    })
}
