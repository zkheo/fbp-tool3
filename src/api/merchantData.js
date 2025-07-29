import request from '../util/request.js';

export function getList(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/merchantData/list',
        method: 'post',
        data: content
    });
}
export function saveOrUpdate(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/merchantData/saveOrUpdate',
        method: 'post',
        data: content
    });
}
