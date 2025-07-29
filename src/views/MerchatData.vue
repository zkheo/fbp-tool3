<template>
    <div class="apiRecord">
        <div class="apiheader">
            <el-descriptions title="" :column="2" border>
                <el-descriptions-item label="业务号">
                    <el-input v-model="params.busNo" placeholder="业务号"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="公司名称">
                    <el-input v-model="params.companyName" placeholder="公司名称"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="商户号">
                    <el-input v-model="params.merchantId" placeholder="商户号"></el-input>
                </el-descriptions-item>
                <el-descriptions-item label="商户类型">
                    <el-select v-model="params.merchantType">
                        <el-option
                            v-for="item in merchantTypes"
                            :key="item.val"
                            :label="item.key"
                            :value="item.val"
                        >
                        </el-option>
                    </el-select>
                </el-descriptions-item>
            </el-descriptions>
            <div style="margin-top: 10px; text-align: end">
                <el-button @click="search(1)" style="width: 6rem">查询</el-button>
                <el-button @click="clear()" style="width: 6rem">重置</el-button>
                <el-button @click="add()" style="width: 6rem" type="primary" >新增</el-button>
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
                        prop="busNo"
                        label="业务号">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="companyName"
                        label="公司">
                </el-table-column>
                <el-table-column
                        prop="merchantType"
                        label="商户类型"
                        :formatter="merchantTypeFormat"
                >
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="merchantId"
                        label="商户号">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="storeId"
                        label="门店号">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="ccPublic"
                        label="长城公钥">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="ccPrivate"
                        label="长城私钥">
                </el-table-column>
                <el-table-column
                        show-overflow-tooltip
                        prop="appId"
                        label="APP_ID">
                </el-table-column>
                <el-table-column
                show-overflow-tooltip
                        prop="appSecret"
                        label="APP_SECRET">
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
                        </el-row>
                    
                       
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-drawer v-model="codedrawer" title="" :with-header="false" size="40%"
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
                        <el-button type="primary" plain @click="saveOrUpdateFunc">保存</el-button>
                    </template>
                    <el-descriptions-item label="业务号">
                        <el-input v-model="item.busNo" type="text"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="公司">
                        <el-input v-model="item.companyName" type="text"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="商户类型">
                        <el-select v-model="item.merchantType">
                            <el-option
                                v-for="item in merchantTypes"
                                :key="item.val"
                                :label="item.key"
                                :value="item.val"
                            >
                            </el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item label="商户号">
                        <el-input v-model="item.merchantId" type="text"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="门店号">
                        <el-input v-model="item.storeId" type="text"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="长城公钥">
                        <el-input v-model="item.ccPublic" type="textarea"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="长城私钥">
                        <el-input v-model="item.ccPrivate" type="textarea"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="APP_ID">
                        <el-input v-model="item.appId" type="textarea"/>
                    </el-descriptions-item>
                    <el-descriptions-item label="APP_SECRET">
                        <el-input v-model="item.appSecret" type="textarea"/>
                    </el-descriptions-item>
                </el-descriptions>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import {ref} from "vue";
import dayjs from 'dayjs';
import CodePlan from '@/components/CodePlan.vue'
import {getList, saveOrUpdate} from "../api/merchantData";
import {jsonFormat} from "../common/Contant"
import {ElNotification} from "element-plus";

export default {
    name: 'MerchatData',
    components: {
        CodePlan
    },
    setup() {
        const tableData = ref([])
        const params = ref({
            busNo: null,
            companyName: null,
            merchantType: null,
            merchantId: null
        });
        const item = ref({})
        const merchantTypes = ref([
            {key: "尾款", val: 1},
            {key: "定金", val: 2},
        ])
        const code = ref('')
        const codedrawer = ref(false)
        const editdrawer = ref(false)

        const search = () => {
            trimSearchParam()
            getList(params.value).then(res => {
                tableData.value = res.data
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
            code.value = jsonFormat(row[column.property]);
            codedrawer.value = true
        }
        const merchantTypeFormat = (row) => {
            return row.merchantType == 1 ? '尾款' : '定金'
        }
        const clear = () => {
            params.value = {
                busNo: null,
                companyName: null,
                merchantType: null,
                merchantId: null
            }
        }
        const add = () => {
            item.value = {}
            editdrawer.value = true
        }
        const handleEdit = (row) => {
            item.value = row
            editdrawer.value = true
        }
        const saveOrUpdateFunc = () => {
            saveOrUpdate(item.value).then(res => {
                if (res.code === "200") {
                    ElNotification.warning({
                        title: '提示',
                        message: '操作成功',
                        position: 'top-left'
                    });
                    editdrawer.value = false
                    search()
                }
            })
        }

        return {
            params,
            merchantTypes,
            saveOrUpdateFunc,
            tableData,
            code,
            codedrawer,
            editdrawer,
            item,
            search,
            handleRowClick,
            clear,
            merchantTypeFormat,
            handleEdit,
            jsonFormat,
            add
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
