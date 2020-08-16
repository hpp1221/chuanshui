<template>
    <el-dialog
        title="编辑"
        :visible.sync="viewShelfInfo.visible"
        width="70%"
        :destroy-on-close="true"
    >
        <el-table
            v-loading="loading"
            :data="tableData"
            ref="multipleTable"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="shelfNumber" label="货架编码"></el-table-column>
            <el-table-column prop="allStock" label="总库存"></el-table-column>
            <el-table-column prop="shelfCount" label="货物数"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleEditStock(scope.$index, scope.row)">修改库存</el-button>
                    <el-button
                        type="text"
                        class="operate-record"
                        @click="handleOperateRecord(scope.$index, scope.row)"
                    >操作记录</el-button>
                    <el-button type="success" @click="handlePrintLabel">打印标贴</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleSureModal">确 定</el-button>
        </span>
        <ModificationStock
            v-if="recordInfo.visible"
            :recordInfo="recordInfo"
            @handleCloseRecordModal="handleCloseRecordModal"
            @handleSureRecordModal="handleSureRecordModal"
        />
    </el-dialog>
</template>
<script>
import './ShelfList.less';
import ModificationStock from '../../../common/modification-stock/ModificationStock';
export default {
    name: 'ViewShelfModal',
    props: ['viewShelfInfo'],
    components: {
        ModificationStock
    },
    data() {
        return {
            tableData: [
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格1',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格2',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格3',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格4',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格5',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方格6',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方7',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 11
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方8',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 18
                }
            ], //列表
            loading: false,
            multipleSelection: [], //多选
            recordInfo: {
                visible: false,
                currentItem: {}
            } //修改记录信息
        };
    },
    methods: {
        //确定
        handleSureModal() {
            this.$emit('handleSureModal', false);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //打印标贴
        handlePrintLabel() {},
        //打开修改库存弹出框
        handleEditStock(index, row) {
            this.recordInfo = Object.assign({}, this.recordInfo, { currentItem: row, visible: true });
        },
        //修改库存记录关闭回调
        handleCloseRecordModal(visible) {
            this.$set(this.recordInfo, 'visible', visible);
        },
        //修改库存记录确定回调
        handleSureRecordModal(visible) {
            this.$set(this.recordInfo, 'visible', visible);
        }
    }
};
</script>