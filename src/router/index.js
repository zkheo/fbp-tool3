import RedisData from '../views/RedisData.vue'
import Home from '../views/Home.vue'
import ApiRecord from '../views/ApiRecord.vue'
import ThreeCallLog from '../views/ThreeCallLog.vue'
import MerchantData from '../views/MerchatData.vue'
import NewKingdeeSyncRecord from '../views/NewKingdeeSyncRecord.vue'
import {createRouter, createWebHistory} from "vue-router";


export const routes = [
    {
        path: '/',
        redirect: '/Home'
    },
    {
        path: '/home',
        name: 'Home',
        title: '首页',
        component: Home
    },
    {
        path: '/redisData',
        name: 'RedisData',
        title: 'Redis数据',
        component: RedisData
    },
    {
        path: '/apiRecord',
        name: 'ApiRecord',
        title: 'FBP补偿数据',
        component: ApiRecord
    },
    {
        path: '/threeCallLog',
        name: 'ThreeCallLog',
        title: '调用三方日志',
        component: ThreeCallLog
    },
    {
        path: '/newKingdeeSyncRecord',
        name: 'NewKingdeeSyncRecord',
        title: '新金蝶同步记录',
        component: NewKingdeeSyncRecord
    },
    {
        path: '/merchantData',
        name: 'MerchantData',
        title: '商户管理',
        component: MerchantData
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
