<template>
    <div id="page">
        <div id="redisWin">
            <MacHeader :value="value"></MacHeader>
            <div id="redisWin-content">
                <el-row style="height: 100%">
                    <el-col :span="8">
                        <div class="redisWin-content-left">
                            <div class="redisWin-content-left-search">
                                <el-input
                                    v-model="key"
                                    placeholder="筛选"
                                >
                                    <template #append>
                                        <el-button :icon="SearchIcon"  @click="getKeyList"/>
                                    </template>
                                </el-input>
                            </div>
                            <div class="redisWin-content-left-list">
                                <div class="redisWin-content-left-list-item" :class="{'redisWin-content-left-list-item-border': index === activity}" v-for="(item,index) in keys" :key="item" @click="keyClike(item, index)">
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="redisWin-content-right">
                            <CodePlan :value="value" :header-show="false"></CodePlan>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {getValByKey, getkeys} from "../api/redisdata";
import {success, isJson} from "../common/Contant"
import {ElNotification} from "element-plus";
import MacHeader from "@/components/MacHeader.vue";
import { Search as SearchIcon } from '@element-plus/icons-vue'
import CodePlan from '@/components/CodePlan.vue'
export default {
    name: 'RedisData',
    components: {
        MacHeader,
        SearchIcon,
        CodePlan
    },
    setup() {
        onMounted(() => {
        })
        const key = ref('');
        const value = ref('');
        const activity = ref(0);
        const keys = ref([])

        function keyClike(item, index){
            activity.value = index
            key.value = item
            getDate()
        }

        function getDate() {
            getValByKey({key: key.value}).then((res) => {
                if (res.code === success) {
                    if (isJson(res.data)) {
                        value.value = JSON.stringify(JSON.parse(res.data), null, 2);
                    } else {
                        value.value = res.data;
                    }
                } else {
                    ElNotification.warning({
                        title: '提示',
                        message: res.message,
                        position: 'top-left'
                    })
                }
            });
        }
        function getKeyList() {
            if (!key.value) {
                return;
            }
            getkeys({pattern: key.value + '*'}).then((res) => {
                if (res.code === success) {
                    keys.value = res.data;
                } else {
                    ElNotification.warning({
                        title: '提示',
                        message: res.message,
                        position: 'top-left'
                    })
                }
            });
        }
        return {
            key,
            value,
            activity,
            keyClike,
            keys,
            getKeyList,
            SearchIcon
        };
    }
}
</script>

<style>
#page {
    flex-wrap: wrap;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    height: 90%;
    margin: 20px 0px;
    overflow: hidden;
}
#redisWin{
    width: 80%;
    overflow: auto
}
#redisWin-content{
    width: 100%;
    height: 90%;
    border-radius: 0px 0px 10px 10px;

}
.redisWin-content-left{
    height: 100%;
    background-color: #363636;
    border-radius: 0px 0px 0px 10px;
}
.redisWin-content-right{
    height: 100%;
    background-color: #262626;
    border-radius: 0px 0px 10px 0px;
}
.redisWin-content-left-search{
    padding: 10px;
}
.redisWin-content-left-list {
    //background-color: red;
    overflow-y: auto;
    overflow-x: hidden ;
    max-height: 60%; /* 例子中设定的最大高度为300px */
}
.redisWin-content-left-list-item {
    margin: 5px 10px;
    padding: 10px 10px;
    color: #cacbcc;
    background-color: #262626;
    border-radius: 3px;
    box-shadow: 0px 2px 3px 0 rgba(159, 154, 154, 0.1);

}
.redisWin-content-left-list-item-border {
    background-color: #707070;
}


</style>
