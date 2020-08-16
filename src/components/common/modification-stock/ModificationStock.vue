<template>
    <el-dialog
        title="修改库存"
        :visible.sync="stockModalInfo.visible"
        width="35%"
        :destroy-on-close="true"
        append-to-body
    >
        <el-form ref="stockForm" :model="stockForm" label-width="80px" class="record-form">
            <el-form-item label-width="8px">
                <el-radio-group v-model="stockForm.radio">
                    <el-radio label="add">加库存</el-radio>
                    <el-radio label="reduce">减库存</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="现有库存:">
                <el-input v-model="stockForm.numStock" :disabled="true" placeholder="请输入"></el-input>
                <span>码</span>
            </el-form-item>
            <el-form-item label="修改数量:">
                <el-input v-model="stockForm.number" placeholder="请输入"></el-input>
                <span>码</span>
            </el-form-item>
            <el-form-item label="最终数量:">
                <el-input v-model="stockForm.lastNumber" placeholder="请输入"></el-input>
                <span>码</span>
            </el-form-item>
            <el-form-item label="修改理由:">
                <el-select v-model="stockForm.reason" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input
                    type="textarea"
                    placeholder="请输入"
                    :autosize="{minRows: 4,maxRows: 10}"
                    v-model="stockForm.remarks"
                ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCloseStockModal">取 消</el-button>
            <el-button type="primary" @click="handleSureStockModal">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import './ModificationStock.less';
export default {
    name: 'ModificationStock',
    props: ['stockModalInfo'],
    data() {
        return {
            stockForm: {
                radio: 'add',
                numStock: '',
                number: '',
                lastNumber: '',
                reason: '',
                remarks: ''
            }
        };
    },
    mounted() {
    },
    methods: {
        //修改库存弹出关闭
        handleCloseStockModal() {
            this.$emit('handleCloseStockModal', false);
        },
        //修改库存弹出确定
        handleSureStockModal() {
            this.$emit('handleSureStockModal', false);
        }
    }
};
</script>