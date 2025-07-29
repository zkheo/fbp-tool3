<template>
    <div class="apiRecord">
        <div class="apiheader">
            <el-descriptions title="" :column="3" border>
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
                <el-descriptions-item label="是否异常">
                    <el-select v-model="params.ex">
                        <el-option
                            v-for="item in exs"
                            :key="item.val"
                            :label="item.key"
                            :value="item.val"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="关键值">
                    <el-input v-model="params.keyword" placeholder="请输入关键值">
                    </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="接口地址">
                    <el-input v-model="params.url" placeholder="请输入接口地址"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="请求参数">
                    <el-input v-model="params.request" placeholder="请输入请求参数"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="错误信息">
                    <el-input v-model="params.exMsg" placeholder="请输入错误信息"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="创建时间">
                    <el-date-picker
                            v-model="time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="timeChange"
                    >
                    </el-date-picker>
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
                    prop="ex"
                    label="是否异常"
                    :formatter="exFormat"
                >
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                    prop="url"
                    label="接口">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="keyword"
                        label="关键值">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="request"
                        label="请求参数">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="response"
                        label="返回参数">
                </el-table-column>
                <el-table-column
                    show-overflow-tooltip
                        prop="exMsg"
                        label="异常信息">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
            </el-table>
        </div>
        <div class="apiPage">
            <MPage :total="dataTotal" @pageSize="(x) => params.size = x" @getList="search"></MPage>
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
import dayjs from 'dayjs';
import MPage from '@/components/MPage.vue'
import CodePlan from '@/components/CodePlan.vue'
import {getList} from "../api/threeCallLog";
import {jsonFormat} from "../common/Contant"

export default {
    name: 'ThreeCallLog',
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
            startTime: null,
            endTime: null,
            current: 1,
            size: 10,
        });

        const types = ref([
            {key: "招商", val: 1},
            {key: "金蝶", val: 2},
        ])
        const exs = ref([
            {key: "否", val: 0},
            {key: "是", val: 1},
        ])
        const time = ref([])
        const dataTotal = ref(0)
        const code = ref('')
        const codedrawer = ref(false)

        const search = (page) => {
            params.value.current = page || 1
            trimSearchParam()
            getList(params.value).then(res => {
                tableData.value = res.data.records
                dataTotal.value = res.data.total
            })
        }
        const timeChange = () => {
            if (time.value[0]) {
                params.value.startTime = dayjs(time.value[0]).format('YYYY-MM-DD') + ' 00:00:00'
            }
            if (time.value[1]) {
                params.value.endTime = dayjs(time.value[1]).format('YYYY-MM-DD') + ' 23:59:59'
            }
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
            code.value = jsonFormat(row[column.property]);
            codedrawer.value = true
        }
        const typeFormat = (row) => {
            return row.type == 1 ? '招商' : '金蝶'
        }
        const exFormat = (row) => {
            return row.ex == 0 ? '否' : '是'
        }
        const clear = () => {
            params.value = {
                keyword: null,
                type: null,
                url: null,
                request: null,
                exMsg: null,
                ex: null,
                startTime: null,
                endTime: null,
                current: 1,
                size: 10,
            }
            time.value = []
        }
        return {
            params,
            types,
            exs,
            time,
            tableData,
            dataTotal,
            code,
            codedrawer,
            timeChange,
            search,
            handleRowClick,
            clear,
            typeFormat,
            exFormat,
            jsonFormat,
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
