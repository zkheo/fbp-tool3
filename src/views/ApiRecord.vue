<template>
    <div class="apiRecord">
        <div class="apiheader">
            <el-descriptions title="" :column="3" border>
                <el-descriptions-item label="TraceId">
                    <el-input v-model="params.traceId" placeholder="请输入TraceId">
                    </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="关键值">
                    <el-input v-model="params.keyw" placeholder="请输入关键值">
                    </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="错误信息">
                    <el-input v-model="params.exMsg" placeholder="请输入错误信息">
                    </el-input>
                </el-descriptions-item>
                <el-descriptions-item label="是否补偿">
                    <el-select v-model="params.compensate">
                        <el-option
                            v-for="item in compensates"
                            :key="item.val"
                            :label="item.key"
                            :value="item.val"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
                <el-descriptions-item label="是否修复">
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
                <el-descriptions-item label="创建时间">
                    <el-date-picker
                            style="width: -webkit-fill-available"
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
                        show-overflow-tooltip
                        prop="traceId"
                        label="traceId">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="scene"
                        label="场景">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="keyw"
                        label="关键值">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="paramJson"
                        label="参数">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="exMsg"
                        label="异常信息">
                </el-table-column>
                <el-table-column
                        prop="retryNum"
                        label="重试次数">
                </el-table-column>
                <el-table-column
                        prop="compensate"
                        label="是否补偿"
                        :formatter="compensateFormat"
                >
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态"
                        :formatter="stateFormat"
                >
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="remark"
                        label="备注">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="createTime"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="updateTime"
                        label="更新时间">
                </el-table-column>
                <el-table-column
                        label="操作"
                        prop="operation"
                >
                    <template #default="scope">
                        <el-row :gutter="24">
                            <el-col :span="10">
                                <el-button size="small" @click="handleEdit(scope.row)">
                            修改
                        </el-button>
                            </el-col>
                            <el-col :span="10">
                                <el-button size="small" @click="buChang(scope.row)">
                            补偿
                        </el-button>
                            </el-col>
                        </el-row>
                    
                       
                    </template>
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
            <el-drawer v-model="editdrawer" title="修改" :with-header="false" size="40%"
                       style="background-color: #f9fafb">
                <el-descriptions
                        title="修改信息"
                        :column="1"
                        size="default"
                        border>
                    <template #extra>
                        <el-button type="primary" plain @click="editSave">保存</el-button>
                    </template>
                    <el-descriptions-item label="ID" width="4rem">{{editItem.id}}</el-descriptions-item>
                    <el-descriptions-item label="traceId">{{editItem.traceId}}</el-descriptions-item>
                    <el-descriptions-item label="场景">{{editItem.scene}}</el-descriptions-item>
                    <el-descriptions-item label="关键值">{{editItem.keyw}}</el-descriptions-item>
                    <el-descriptions-item label="参数">
                        <CodePlan :value="jsonFormat(editItem.paramJson)" :headerShow="false"></CodePlan>
                    </el-descriptions-item>
                    <el-descriptions-item label="异常信息">{{editItem.exMsg}}</el-descriptions-item>
                    <el-descriptions-item label="重试次数">
                        <el-input v-model="editItem.retryNum" type="number"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="是否补偿">
                        <el-select v-model="editItem.compensate">
                            <el-option
                                v-for="item in compensates"
                                :key="item.val"
                                :label="item.key"
                                :value="item.val"
                            >
                            </el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item label="修复状态">
                        <el-select v-model="editItem.state">
                            <el-option
                                v-for="item in states"
                                :key="item.val"
                                :label="item.key"
                                :value="item.val"
                            >
                            </el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item label="修复状态">
                        <el-input v-model="editItem.remark" type="textarea"/>
                    </el-descriptions-item>

                </el-descriptions>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import dayjs from 'dayjs';
import MPage from '@/components/MPage.vue'
import CodePlan from '@/components/CodePlan.vue'
import {getList, update, retry} from "../api/apiRecord";
import {jsonFormat} from "../common/Contant"
import {ElNotification} from "element-plus";

export default {
    name: 'ApiRecord',
    components: {
        MPage, // 注册局部组件
        CodePlan
    },
    setup() {
        const tableData = ref([])
        const params = ref({
            traceId: null,
            keyw: null,
            exMsg: null,
            state: null,
            compensate: null,
            startTime: null,
            endTime: null,
            current: 1,
            size: 10,
        });
        const editItem = ref({})

        const states = ref([
            {key: "未修复", val: 0},
            {key: "已修复", val: 1},
        ])
        const compensates = ref([
            {key: "否", val: 0},
            {key: "是", val: 1},
        ])
        const time = ref([])
        const dataTotal = ref(0)
        const code = ref('')
        const codedrawer = ref(false)
        const editdrawer = ref(false)

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
        const compensateFormat = (row) => {
            return row.compensate == 0 ? '否' : '是'
        }
        const stateFormat = (row) => {
            return row.state == 0 ? '未修复' : '已修复'
        }
        const clear = () => {
            params.value = {
                traceId: null,
                keyw: null,
                exMsg: null,
                state: null,
                compensate: null,
                startTime: null,
                endTime: null,
                current: 1,
                size: 10,
            }
            time.value = []
        }
        const handleEdit = (row) => {
            editItem.value = row
            editdrawer.value = true
        }
        const editSave = () => {
            update(editItem.value).then(res => {
                if (res.code === "200") {
                    ElNotification.warning({
                        title: '提示',
                        message: '操作成功',
                        position: 'top-left'
                    });
                    editdrawer.value = false
                    search(1)
                }
            })
        }
        const buChang = (row) => {
            retry(row.id).then(res => {
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
            states,
            compensates,
            time,
            tableData,
            dataTotal,
            code,
            codedrawer,
            editdrawer,
            editItem,
            timeChange,
            search,
            handleRowClick,
            clear,
            compensateFormat,
            stateFormat,
            handleEdit,
            jsonFormat,
            editSave,
            buChang
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
