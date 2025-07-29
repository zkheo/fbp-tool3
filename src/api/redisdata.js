import request from '../util/request.js';

export function getValByKey(params) {
    // const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/redis/getVal',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

export function getkeys(params) {
    // const content = JSON.stringify(params);
    return request({
        url: '/fbp/custom/redis/keys',
        method: 'post',
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
