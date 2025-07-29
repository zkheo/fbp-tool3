import request from '../util/request.js';

export function getList(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/threeCallLog/getList',
        method: 'post',
        data: content
    });
}

