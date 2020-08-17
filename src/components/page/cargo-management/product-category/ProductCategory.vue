<template>
    <div class="product-category-page">
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>产品分类</span>
                </div>
                <el-button type="primary" @click="addFirstCategory">新增大类</el-button>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                row-key="id"
                lazy
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column label="分类名称" prop="name">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.is_first" class="child-line marginRight10">|————————</span>
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="left">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            class="m-r-20"
                            v-show="scope.row.is_first"
                            @click="addSubCategories( scope.$index, scope.row)"
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
                    :current-page="pageInfo.pageIndex"
                    :page-size="pageInfo.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="editVisible" width="380px" :before-close="dialogClose">
            <el-form ref="formBox" :model="form" :rules="rules" label-width="90px">
                <el-form-item label="类别名称:" prop="name">
                    <el-input placeholder="请输入" autofocus="autofocus" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="父级:" prop="parentsCategoryId" v-if="parentsCategoryShow">
                    <el-select v-model="form.parentsCategoryId" placeholder="请选择" class="handle-select">
                        <el-option v-for="state in categoryOptions" :key="state.key" :value="state.key" :label="state.name" />
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClose">取 消</el-button>
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
            pageInfo: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            loading: false,
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            form: {
                name: '',
                parentsCategoryId:''
            },
            rules: {
                name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }]
            },
            parentsCategoryShow:false,  // 弹框内 父级分类 是否显示
            idx: -1,
            id: -1,
            categoryOptions: [],
            parentsCategory: '',
            list1: [],
            formTitle: '',
        };
    },
    created() {
    },
    mounted() {
        // this.MissionTemplateForm.category = this.categoryOptions[0].name;
        this.categoryOptions = [];
        this.list1 = [{
            id: 1,
            name: '工具',
            is_first: true,
            children: [
                {
                    id: 11,
                    name: '剪刀',
                    is_second: true,
                    parentsCategoryName:'工具',
                    parentsCategoryId:1,
                },
                {
                    id: 12,
                    name: '尺子',
                    is_second: true,
                    parentsCategoryName:'工具',
                    parentsCategoryId:1,
                },
                {
                    id: 13,
                    name: '胶带',
                    is_second: true,
                    parentsCategory:'工具',
                    parentsCategoryName:1,
                }
            ]
        },
            {
                id: 2,
                name: '书籍',
                is_first: true,
                children:[]
            },
            {
                id: 3,
                name: '布匹',
                is_first: true,
                children: [
                    {
                        id: 31,
                        name: '纱布',
                        is_second: true,
                        parentsCategoryName:'布匹',
                        parentsCategoryId:3,
                    },
                    {
                        id: 32,
                        name: '涤纶布',
                        is_second: true,
                        parentsCategoryName:'布匹',
                        parentsCategoryId:3,
                    },
                    {
                        id: 33,
                        name: '棉布',
                        is_second: true,
                        parentsCategoryName:'布匹',
                        parentsCategoryId:3,
                    }
                ]
            },
            {
                id: 4,
                name: '分类4',
                is_first: true,
                children:[]
            }];
        // 大类列表
        this.list1.forEach((ev,i)=>{
            this.categoryOptions.push({
                key: ev.id,
                name: ev.name
            })
        });
        console.log('this.categoryOptions', this.categoryOptions);
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.pageInfo).then(res => {
                console.log(res);
                // this.tableData = res.list;
                // this.pageTotal = res.pageTotal || 50;
                this.tableData = this.list1;
                this.pageTotal = 5;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.pageInfo, 'pageIndex', 1);
            this.getData();
        },
        // 新增大类
        addFirstCategory() {
            this.formTitle = '新增大类';
            console.log('this.form', this.form);
            this.editVisible = true;
        },
        // 编辑大类/编辑下级
        editFirstCategory(index, row) {
            console.log('row', row);
            // this.$refs['formBox'].clearValidate();
            this.idx = index;

            if (row.is_first) {
                this.formTitle = '编辑大类';
            } else {
                this.formTitle = '编辑下级';
                this.parentsCategoryShow = true;
            }
            this.editVisible = true;
            this.$nextTick(()=> {
                const new_obj = JSON.parse(JSON.stringify(row));
                console.log('new_obj', new_obj);
                // 触发更新
                this.form = Object.assign({}, this.form,new_obj);
                console.log('this.form', this.form);
            })
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
        addSubCategories( index, row) {
            this.parentsCategoryShow = true;
            this.formTitle = '新增下级';
            this.idx = index;
            this.editVisible = true;
            this.$nextTick(()=>{
                const new_obj = JSON.parse(JSON.stringify(row));
                new_obj['parentsCategoryId'] = row.id;
                new_obj['name'] = '';
                console.log('new_obj', new_obj);
                // 触发更新
                this.form = Object.assign({}, this.form,new_obj);
            })
        },
        // 保存编辑
        saveEdit() {
            let request = {};
            this.$refs['formBox'].validate(valid => {
                if (valid) {
                    // 新增大类
                    if (this.formTitle === '新增大类') {
                        request = {
                            name: this.form.name
                        };
                        console.log('request', request);
                        // ajax
                        // 请求成功  添加进列表 或者 刷新列表
                        const obj = {
                            id: 5,
                            name: this.form.name,
                            is_first: true
                        }
                        // 请求失败
                    }else if(this.formTitle === '新增下级'){

                    }else if(this.formTitle === '编辑大类'){
                        let loadingInstance = Loading.service({
                            text: '操作中',
                            background: 'transparent'
                        });
                        setTimeout(() => {
                            loadingInstance.close();
                            this.$notify({
                                title: '编辑成功',
                                message: '',
                                type: 'success',
                                duration: 1000
                            });
                        }, 500);
                        this.editVisible = false;

                        this.$set(this.tableData, this.idx, this.form);

                    }else if(this.formTitle === '编辑下级'){
                        let loadingInstance = Loading.service({
                            text: '操作中',
                            background: 'transparent'
                        });
                        setTimeout(() => {
                            loadingInstance.close();
                            this.$notify({
                                title: '编辑成功',
                                message: '',
                                type: 'success',
                                duration: 1000
                            });
                        }, 500);
                        this.editVisible = false;
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        console.log('this.form', this.tableData);

                        // this.$set(this.tableData, this.idx, this.form);

                    }
                    console.log('this.tableData', this.tableData);
                    console.log('this.idx', this.idx);
                    console.log('this.form', this.form);
                } else {
                    return false;
                }
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            this.getData();
        },
        // 弹框关闭前操作
        dialogClose(){
            console.log('弹框关闭前操作');
            this.$refs['formBox'].resetFields();
            this.$refs['formBox'].clearValidate();
            this.editVisible = false;
        }

    }
};
</script>
