import axios from 'axios';
import { ElNotification } from 'element-plus';
import { evnUrlKey, evnTokenKey } from "@/common/Contant";

const service = axios.create({
    timeout: 60000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
});
//添加请求拦截器
service.interceptors.request.use(
    config => {
        let envUrl = localStorage.getItem(evnUrlKey);
        let token = localStorage.getItem(evnTokenKey + envUrl);
        if (config.url.indexOf('getAccessTokenByPassword') > 0) {
            if (envUrl.indexOf('test') > 0) {
                envUrl = "/tokent"
            } else {
                envUrl = "/tokenp"
            }
        } else {
            if (!token || token === '') {
                ElNotification.warning({
                    title: '提示',
                    message: "未设置访问的token",
                    position: 'top-left'
                })
                throw new Error('未设置访问的token');
            }
        }
        if (!envUrl || envUrl === '') {
            ElNotification.warning({
                title: '提示',
                message: "未选择访问的环境URL",
                position: 'top-left'
            })
            throw new Error('未选择访问的环境URL');
        }

        console.log("2222:"+envUrl)
        config.baseURL = envUrl;
        config.headers['access-token'] = token;
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
);
service.interceptors.response.use(
    response => {
        const dataAxios = response.data
        // 根据 code 进行判断
        switch (dataAxios.code) {
            case "200":
                return dataAxios
            default:
                ElNotification.warning({
                    title: '提示',
                    message: dataAxios.message,
                    position: 'top-left'
                })
                return dataAxios
        }
    }, error => {
        ElNotification.warning({
            title: '提示',
            message: error.response.data.message || error.message,
            position: 'top-left'
        })
        console.log(error)
        return Promise.reject(error)
    });

export default service;
