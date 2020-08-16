<template>
    <el-dialog
        title="操作记录"
        :visible.sync="recordModalInfo.visible"
        width="35%"
        :destroy-on-close="true"
        append-to-body
    >
        <el-form :inline="true">
            <el-form-item label="产品编号:">???</el-form-item>
            <el-form-item label="货架编码:">???</el-form-item>
        </el-form>
        <el-table v-loading="loading" :data="tableData" ref="multipleTable" tooltip-effect="dark">
            <el-table-column prop="operationer" label="操作员"></el-table-column>
            <el-table-column prop="operationType" label="操作类型"></el-table-column>
            <el-table-column prop="count" label="数量"></el-table-column>
            <el-table-column prop="operationCount" label="操作后数量"></el-table-column>
            <el-table-column prop="reason" label="理由"></el-table-column>
            <el-table-column prop="commit" label="备注"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCloseRecordModal">取 消</el-button>
            <el-button type="primary" @click="handleSureRecordModal">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import './OperationRecord.less';
export default {
    name: 'OperationRecord',
    props: ['recordModalInfo'],
    data() {
        return {
            tableData: [],
            loading: false
        };
    },
    methods: {
        //操作记录弹出关闭
        handleCloseRecordModal() {
            this.$emit('handleCloseRecordModal', false);
        },
        //操作记录弹出确定
        handleSureRecordModal() {
            this.$emit('handleSureRecordModal', false);
        }
    }
};
</script>