import request from '../util/request.js';

export function getTokenApi() {
    const params = {"userName": "GW00314772", "passWord": "Aq10Us2YoZ"}
    const content = JSON.stringify(params);
    return request({
        url: '/gateway/ucenter/user/getAccessTokenByPassword',
        method: 'post',
        data: content
    });
}

