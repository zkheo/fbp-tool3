import request from '../util/request.js';

export function getListApi(params) {
    const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/fbpKingdeeSyncRecord/getPage',
        method: 'post',
        data: content
    });
}

export function retryApi(ids) {
    const content = JSON.stringify(ids);
    return request({
        url: '/fbp/custom/fbpKingdeeSyncRecord/retry',
        method: 'post',
        data: content
    });
}

