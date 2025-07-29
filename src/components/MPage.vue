<template>
  <div class="m-page">
      <el-pagination
              :background="false"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :page-sizes="[10, 20, 50, 100, 1000]"
              :total="total"
              :current-page="currentPage"
      >
      </el-pagination>
  </div>

</template>
<script>
export default {
    name: "MPage",
    props: {
        total: {
            type: Number,
            default: null,
        },
        currentPage: {
            type: Number,
            default: 1
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.$emit('getList',val)
        },
        handleSizeChange(val) {
            this.$emit('pageSize',val)
            this.$emit('getList',1)
        }
    },
};
</script>

<style scoped></style>
