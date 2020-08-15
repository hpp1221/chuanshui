<template>
    <div>
        <div class="container clearfix">
            <div class="handle-box">
                <!--<el-button
                        type="primary"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>-->
                <span class="input-title">产品名称：</span>
                <el-input v-model="query.name" placeholder="请输入" class="handle-input mr10"></el-input>
                <span class="input-title">产品分类：</span>
                <el-select v-model="MissionTemplateForm.category" placeholder="请选择" class="handle-select mr10">
                    <el-option v-for="state in categoryOptions" :key="state.key" :value="state.key" :label="state.name" />
                </el-select>
                <span class="input-title">产品标签：</span>
                <el-cascader
                    placeholder="请选择"
                    :options="options"
                    :show-all-levels="false"
                    :props="{ multiple: true }"
                    filterable
                ></el-cascader>
                <!--<el-button type="primary" icon="el-icon-search" @click="addPage">添加</el-button>
                <el-button type="primary" icon="el-icon-search" @click="testPage">测试啊</el-button>-->
            </div>
            <div class="btn-right">
                <el-button @click="handleSearch">重置</el-button>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>
        </div>
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>产品列表</span>
                </div>
                <el-button type="primary" @click="addPage">新增产品</el-button>
            </div>
            <el-table
                v-loading="loading"
                :data="tableData2"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="code" label="编号" width="75" align="center"></el-table-column>
                <el-table-column prop="name" label="产品名称"></el-table-column>
                <el-table-column prop="type" label="产品">
                    <!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
                </el-table-column>
                <el-table-column prop="all_num" label="总库存"></el-table-column>
                <el-table-column prop="use_num" label="可用库存"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
                        <el-button type="text" @click="handleDelete(scope.$index, scope.row)">锁定</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
                <div class="aa">11111</div>
                <div class="pos-absolute">
                    <el-button type="success" @click="addPage">打印标贴</el-button>
                </div>
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api';
import './OrderList.less';
export default {
    name: 'orderList',
    data() {
        return {
            query: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            loading: false,
            MissionTemplateForm: {
                category: ''
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            categoryOptions: [{ key: '0', name: '请选择' }],
            tableData2: [
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
            ],
            options: [
                {
                    value: 'zhinan',
                    label: '风格',
                    children: [
                        {
                            value: 'shejiyuanze',
                            label: '设计原则'
                        },
                        {
                            value: 'daohang',
                            label: '导航'
                        }
                    ]
                },
                {
                    value: 'zujian',
                    label: '组件',
                    children: [
                        {
                            value: 'basic',
                            label: 'Basic'
                        },
                        {
                            value: 'form',
                            label: 'Form'
                        },
                        {
                            value: 'data',
                            label: 'Data'
                        },
                        {
                            value: 'notice',
                            label: 'Notice'
                        },
                        {
                            value: 'navigation',
                            label: 'Navigation'
                        },
                        {
                            value: 'others',
                            label: 'Others'
                        }
                    ]
                },
                {
                    value: 'ziyuan',
                    label: '资源',
                    children: [
                        {
                            value: 'axure',
                            label: 'Axure Components'
                        },
                        {
                            value: 'sketch',
                            label: 'Sketch Templates'
                        },
                        {
                            value: 'jiaohu',
                            label: '组件交互文档'
                        }
                    ]
                }
            ]
        };
    },
    created() {
        this.getData();
        this.categoryOptions = [
            { key: '1', name: '分类1' },
            { key: '2', name: '分类2' }
        ];
    },
    mounted() {
        // this.MissionTemplateForm.category = this.categoryOptions[0].name;
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                // this.tableData = res.list;
                // this.pageTotal = res.pageTotal || 50;
                this.tableData = this.tableData2;
                this.pageTotal = 12;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        addPage() {
            // this.$route.query
            this.$router.push({ path: '/test', query: { pid: '1' } });
        },
        testPage() {
            // this.$route.query
            this.$router.push({ path: '/test', query: { pid: '2' } });
        },
        // 删除操作
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
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>
