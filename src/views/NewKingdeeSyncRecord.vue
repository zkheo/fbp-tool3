<template>
    <div class="apiRecord">
        <div class="apiheader">
            <el-descriptions title="" :column="2" border>
                <el-descriptions-item label="场景">
                    <el-select v-model="params.type">
                        <el-option
                            v-for="item in types"
                            :key="item.val"
                            :label="item.key"
                            :value="item.val"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="同步状态">
                    <el-select v-model="params.state">
                        <el-option
                            v-for="item in states"
                            :key="item.val"
                            :label="item.key"
                            :value="item.val"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="数据ID">
                    <el-input v-model="params.dataId" placeholder="请输入关键值">
                    </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="请求参数">
                    <el-input v-model="params.paramJson" placeholder="请输入请求参数"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="错误信息">
                    <el-input v-model="params.failMsg" placeholder="请输入错误信息"></el-input>
                </el-descriptions-item>
            </el-descriptions>
            <div style="margin-top: 10px; text-align: end">
                <el-button @click="search(1)" style="width: 6rem">查询</el-button>
                <el-button @click="clear()" style="width: 6rem">重置</el-button>
            </div>
        </div>
        <div class="apicontent">
            <el-table
                    :data="tableData"
                    stripe
                    @row-click="handleRowClick"
                    style="width: 100%">
                <el-table-column
                    prop="type"
                    label="场景"
                    :formatter="typeFormat"
                >
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="是否同步"
                    :formatter="stateFormat"
                >
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="dataId"
                    label="数据ID">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="paramJson"
                        label="请求参数">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="failMsg"
                        label="错误信息">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="100">
                    <template #default="scope">
                        <el-button
                            v-if="scope.row.state === 2 || scope.row.state === 0"
                            type="primary"
                            size="small"
                            @click="retry(scope.row.id)">
                            补偿
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="apiPage">
            <MPage :total="dataTotal" :current-page="params.current" @pageSize="(x) => params.size = x" @getList="search"></MPage>
        </div>
        <div class="apibottom">

        </div>
        <div>
            <el-drawer v-model="codedrawer" title="I am the title" :with-header="false" size="40%"
                       style="background-color: rgba(0, 0, 0, 0); box-shadow:0px 0px">
                <CodePlan :value="code"></CodePlan>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import MPage from '@/components/MPage.vue'
import CodePlan from '@/components/CodePlan.vue'
import {getListApi, retryApi} from "../api/newKingdeeSyncRecord";
import {jsonFormat} from "../common/Contant"
import {ElNotification} from "element-plus";

export default {
    name: 'NewKingdeeSyncRecord',
    components: {
        MPage, // 注册局部组件
        CodePlan
    },
    setup() {
        const tableData = ref([])
        const params = ref({
            keyword: null,
            type: null,
            url: null,
            request: null,
            exMsg: null,
            ex: null,
            current: 1,
            size: 10,
        });

        const types = ref([
            {key: "入库信息", val: 1},
            {key: "出库信息", val: 2},
            {key: "客户信息", val: 3},
            {key: "收款单信息", val: 4},
            {key: "实收单信息", val: 5},
        ])
        const states = ref([
            {key: "待同步", val: 0},
            {key: "同步成功", val: 1},
            {key: "同步失败", val: 2},
        ])
        const dataTotal = ref(0)
        const code = ref('')
        const codedrawer = ref(false)

        const search = (page) => {
            params.value.current = page || 1
            trimSearchParam()
            getListApi(params.value).then(res => {
                tableData.value = res.data.records
                dataTotal.value = res.data.total
            })
        }

        const trimSearchParam = () => {
            for (let key in params.value) {
                if (params.value[key] === null || params.value[key] === '') {
                    delete params.value[key]
                }
            }
        }

        const handleRowClick = (row, column) => {
            if (column.property === 'operation') {
                return;
            }
            if (column.type === 'default' && column.label === '操作') {
                return;
            }
            code.value = jsonFormat(row[column.property]);
            codedrawer.value = true
        }
        const typeFormat = (row) => {
            const type = types.value.find(item => item.val === row.type)
            return type ? type.key : ''
        }
        const stateFormat = (row) => {
            const state = states.value.find(item => item.val === row.state)
            return state ? state.key : ''
        }
        const clear = () => {
            params.value = {
                type: null,
                state: null,
                dataId: null,
                paramJson: null,
                failMsg: null,
                current: 1,
                size: 10,
            }
        }
        const retry = (id) => {
            // TODO: 调用补偿接口
            retryApi([id]).then(res => {
                if (res.code === "200") {
                    ElNotification.warning({
                        title: '提示',
                        message: '操作成功',
                        position: 'top-left'
                    });
                    search(1)
                }
            })
        }
        return {
            params,
            types,
            states,
            tableData,
            dataTotal,
            code,
            codedrawer,
            search,
            handleRowClick,
            clear,
            typeFormat,
            stateFormat,
            jsonFormat,
            retry,
        }
    }
}
</script>
<style scoped>
.apiRecord {
    padding: 20px;
    width: 100%;
}

.apiheader {
    background-color: white;
    padding: 30px;
    padding-bottom: 15px;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.apicontent {
    background-color: white;
    padding: 30px;
    margin-top: 20px;
    border-radius: 0.25rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.apiPage {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}

.apibottom {
    height: 5rem;
}
</style>
