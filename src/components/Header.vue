<template>
    <div id="header" :style="{ backgroundColor: bgColor }">
        <el-row :gutter="10" type="flex" justify="end" style="width: 100%">
            <el-col :span="3">
                <el-select v-model="routePath" placeholder="选择模块" @change="changeRoutePath">
                    <el-option
                        v-for="item in routeList"
                        :key="item.path"
                        :label="item.title"
                        :value="item.path"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-select v-model="evnUrl" placeholder="请选择" @change="changeEnvUrl">
                    <el-option
                            v-for="(value, key) in envUrls"
                            :key="value"
                            :label="key"
                            :value="value"
                    ></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-popover
                        placement="top-start"
                        width="400"
                        trigger="click"
                        @hide="saveToken"
                >
                    <el-row>
                        <el-col>
                            <el-input
                                    type="textarea"
                                    :rows="3"
                                    placeholder="请输入内容"
                                    v-model="evnToken">
                            </el-input>
                        </el-col>
                    </el-row>
                    <template #reference>
                        <el-button>设置Token</el-button>
                    </template>
                </el-popover>
<!--                <el-button @click="getToken()">获取Token</el-button>-->
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {ref, onMounted, computed} from 'vue';
import {envUrls, evnUrlKey, evnTokenKey, routePathKey} from "@/common/Contant";
import {routes} from "@/router/index"
import { useRouter } from 'vue-router';
import {getTokenApi} from "../api/getToken";
export default {
    name: 'Header',
    setup() {
        const evnUrl = ref('');
        const evnToken = ref('');
        const routePath = ref('');
        const routeList = ref([]);
        const router = useRouter();
        onMounted(() => {
            evnUrl.value = localStorage.getItem(evnUrlKey)
            evnToken.value = localStorage.getItem(evnTokenKey)
            routePath.value = localStorage.getItem(routePathKey)
            routeList.value = routes.filter(item => item.title != null && item.title != '').map(item => {
                return {
                    title: item.title,
                    path: item.path
                }
            })
        })
        const bgColor = computed(() => {
            return evnUrl.value.indexOf('prod') > 0 ? '#FFBB95' : 'white'
        });

        const changeEnvUrl = () => {
            localStorage.setItem(evnUrlKey, evnUrl.value);
        }
        const saveToken = () => {
            localStorage.setItem(evnTokenKey + evnUrl.value, evnToken.value);
        }
        const changeRoutePath = () => {
            localStorage.setItem(routePathKey, routePath.value);
            router.push(routePath.value);
        }
        return {
            bgColor,
            evnToken,
            evnUrl,
            envUrls,
            routeList,
            routePath,
            changeEnvUrl,
            saveToken,
            changeRoutePath
        };
    }
}
</script>
<style scoped>
#header {
    height: 2.8rem;
    width: 100%;
    background-color: white;
    box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}
</style>
