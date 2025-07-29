import request from '../util/request.js';

export function getList(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/apiRecord/getList',
        method: 'post',
        data: content
    });
}
export function update(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/apiRecord/update',
        method: 'post',
        data: content
    });
}
export function retry(id) {
    
    return request({
        url: '/fbp/custom/apiRecord/retry?id=' + id,
        method: 'get'
    });
}
