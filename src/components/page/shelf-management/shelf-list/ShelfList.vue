<template>
    <div>
        <div class="container clearfix">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="60px">
                <el-form-item label="楼层:" prop="floor">
                    <el-input v-model="ruleForm.floor"></el-input>
                </el-form-item>
                <el-form-item label="房间:" prop="room">
                    <el-input v-model="ruleForm.room"></el-input>
                </el-form-item>
                <el-form-item label="货架号:" prop="shelfNumber">
                    <el-input v-model="ruleForm.shelfNumber"></el-input>
                </el-form-item>
                <el-form-item label="货架层:" prop="shelfLayer">
                    <el-input v-model="ruleForm.shelfLayer"></el-input>
                </el-form-item>
                <el-form-item>
                    <div class="btn-right">
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                        <el-button type="primary" @click="handleSearch('ruleForm')">搜索</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>货架列表</span>
                </div>
                <el-button type="primary" @click="addPage">添加货架</el-button>
            </div>
            <el-table
                v-loading="loading"
                :data="tableData"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="code" label="编号" width="75" align="center"></el-table-column>
                <el-table-column prop="shelfCode" label="货架编号"></el-table-column>
                <el-table-column prop="goodsNumber" label="货物数"></el-table-column>
                <el-table-column prop="addDate" label="添加日期"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看货物</el-button>
                        <el-button
                            type="text"
                            class="delete-color"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
                <div class="pos-absolute">
                    <el-button @click="addPage" class="multi-delete-color">批量删除</el-button>
                </div>
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageInfo.pageIndex"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 查看货物弹框 -->
        <ViewShelfModal
            :viewShelfInfo="viewShelfInfo"
            @handleSureModal="handleSureModal"
        ></ViewShelfModal>
    </div>
</template>

<script>
import { fetchData } from '../../../../api';
import ViewShelfModal from './viewShelfModal.vue';
import './ShelfList.less';
export default {
    name: 'shelfList',
    components: {
        ViewShelfModal
    },
    data() {
        return {
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 10
            }, //页码信息
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
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方9',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 19
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方10',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 20
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方11',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 21
                },
                {
                    all_num: '200码',
                    use_num: '100码',
                    name: '日本进口方12',
                    tag: ['棉', '卡通', '花纹'],
                    type: '方格',
                    code: 22
                }
            ],//列表
            loading:false,
            multipleSelection: [], //多选
            ruleForm: {
                floor: '', //楼层
                room: '', //房间
                shelfNumber: '', //货架号
                shelfLayer: '' //货架层
            }, //搜索条件
            viewShelfInfo: {
                visible: false,
                currentItem:{}
            }
        };
    },
    created() {
        this.getData();
    },
    mounted() {},
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            // this.loading = true;
            let params = { ...this.pageInfo, ...this.ruleForm };
            fetchData(params).then((res) => {
                // if(res.code !== 200) return;
                // this.loading = false;
                // this.tableData = [];
                this.pageInfo = Object.assign({}, this.pageInfo, { pageIndex: 1, pageTotal: 20 });
            });
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 触发搜索按钮
        handleSearch(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.ruleForm;
                    //ajax`
                } else {
                    return false;
                }
            });
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        addPage() {
            // this.$route.query
            this.$router.push({ path: '/test', query: { pid: '1' } });
        },
        // 删除操作(删除操作要重新计算页码)
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.viewShelfInfo = Object.assign({},this.viewShelfInfo,{currentItem:row,visible:true})
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            // this.getData();
        },
        //查看货物弹窗关闭
        handleSureModal(visible) {
            this.$set(this.viewShelfInfo, 'visible', visible);
        }
    }
};
</script>
