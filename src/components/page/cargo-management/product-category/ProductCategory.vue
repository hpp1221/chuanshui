<template>
    <div class="product-category-page">
        <div class="container p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>产品分类</span>
                </div>
                <el-button type="primary" @click="addFirstCategory">新增大类</el-button>
            </div>
            <el-table
                :data="list1"
                style="width: 100%"
                row-key="id"
                lazy
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column label="分类名称" prop="name"> </el-table-column>
                <el-table-column label="操作" width="200" align="left">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="m-r-20"
                            v-show="scope.row.is_first"
                            @click="addSubCategories(scope, scope.$index, scope.row)"
                            >新增下级</el-button
                        >
                        <el-button type="text" class="m-r-20 m-l-0" @click="editFirstCategory(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" class="delete-color m-l-0" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
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
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="380px">
            <el-form ref="formBox" :model="form" :rules="rules" label-width="90px">
                <el-form-item label="类别名称:" prop="name">
                    <el-input placeholder="请输入" autofocus="autofocus" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级:" v-for="(item, index) in arr1" :key="index"
                    ><!-- v-if="formTitle === '编辑下级' || formTitle === '新增下级'"-->
                    <el-select v-model="firstCategory" placeholder="请选择" class="handle-select mr10" @change="is_change(index)">
                        <el-option v-for="state in categoryOptions" :key="state.key" :value="state.key" :label="state.name" />
                    </el-select>
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
import { Loading } from 'element-ui';
import './ProductCategory.less';
export default {
    name: 'productCategory',
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

            editVisible: false,
            pageTotal: 0,
            form: {
                name: ''
            },
            rules: {
                name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
            },
            idx: -1,
            id: -1,
            categoryOptions: [],
            firstCategory: [],
            list1: [
                {
                    id: 1,
                    name: '工具',
                    is_first: true,
                    children: [
                        {
                            id: 11,
                            name: '剪刀',
                            is_second: true
                        },
                        {
                            id: 12,
                            name: '尺子',
                            is_second: true
                        },
                        {
                            id: 13,
                            name: '胶带',
                            is_second: true
                        }
                    ]
                },
                {
                    id: 2,
                    name: '书籍',
                    is_first: true
                },
                {
                    id: 3,
                    name: '布匹',
                    is_first: true,
                    children: [
                        {
                            id: 31,
                            name: '纱布',
                            is_second: true
                        },
                        {
                            id: 32,
                            name: '涤纶布',
                            is_second: true
                        },
                        {
                            id: 33,
                            name: '棉布',
                            is_second: true
                        }
                    ]
                },
                {
                    id: 4,
                    name: '分类4',
                    is_first: true
                }
            ],
            formTitle: '',
            arr1: ['呵呵', '哈哈']
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
                this.tableData = this.list1;
                this.pageTotal = 5;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 新增大类
        addFirstCategory() {
            this.formTitle = '新增大类';
            console.log('this.form', this.form);
            this.editVisible = true;
        },
        // 编辑
        editFirstCategory(index, row) {
            // this.$refs['formBox'].clearValidate();
            this.idx = index;
            this.form = row;
            if (row.is_first) {
                this.formTitle = '编辑大类';
                this.parentsCategoryShow = false;
            } else {
                this.formTitle = '编辑下级';
            }
            this.editVisible = true;
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
            this.$confirm('确定要删除该分类吗？', '', {
                customClass: 'message-delete',
                type: 'warning',
                center: true
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },

        // 新增下级
        addSubCategories(scope, index, row) {
            // this.$refs['formBox'].clearValidate();
            console.log('scope', scope);
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            let request = {};
            this.$refs['formBox'].validate(valid => {
                if (valid) {
                    if (this.formTitle === '新增大类') {
                        request = {
                            name: this.form.name
                        };
                        console.log('request', request);
                    }
                } else {
                    return false;
                }
            });

            let loadingInstance = Loading.service({
                text: '操作中',
                background: 'transparent'
            });
            setTimeout(() => {
                loadingInstance.close();
                this.$notify({
                    title: '成功',
                    message: '这是一条成功的提示消息',
                    type: 'success',
                    duration: 1000
                });
            }, 500);
            this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        is_change(i) {
            console.log('i=>', i);
        }
    }
};
</script>
