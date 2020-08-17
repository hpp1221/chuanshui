<template>
    <div class="product-label-page">
        <div class="container clearfix">
            <div class="category-wrap">
                <div class="category-level">一级分类:</div>
                <div class="category-list">
                    <span v-for="(item,index) in categoryList" :key="item.id"
                          :class="{'is-select': selectedCategoryId === item.id}" @click="selectCategory(item.id)"
                    >{{item.name}}</span>
                </div>
            </div>
            <el-form :model="searchForm" :inline="true" ref="searchForm" label-width="80px">
                <el-form-item label="输入搜索:" prop="account">
                    <el-input v-model="searchForm.searchLabel" placeholder="请输入" class="input-with-search">
                        <el-button type="primary" slot="append" @click="handleSearch('searchForm')">搜索</el-button>
                    </el-input>
                </el-form-item>
                <!--<el-form-item>
                    <div class="btn-right">
                        <el-button type="primary" @click="handleSearch('searchForm')">搜索</el-button>
                        <el-button type="success" @click="addUser('add')">添加用户</el-button>
                    </div>
                </el-form-item>-->
            </el-form>
        </div>
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>产品标签</span>
                </div>
                <div>
                    <el-button type="success" @click="addCategory">新增分类</el-button>
                    <el-button type="primary" @click="addLabel">新增标签</el-button>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="标签名称" prop="name"></el-table-column>
                <el-table-column label="父级" prop="parentsCategoryName"></el-table-column>
                <el-table-column label="操作" width="200" align="left">
                    <template slot-scope="scope">
                        <el-button type="text" class="m-r-20 m-l-0" @click="editLabel(scope.$index, scope.row)">编辑</el-button>
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
        <!-- 分类 新增 弹出框 -->
        <el-dialog title="新增分类" :visible.sync="categoryVisible" width="380px" :before-close="categoryClose">
            <el-form ref="categoryFormBox" :model="categoryForm" :rules="categoryRules" label-width="90px">
                <el-form-item label="分类名称:" prop="name">
                    <el-input placeholder="请输入分类名称" autofocus="autofocus" v-model="categoryForm.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="categoryClose">取 消</el-button>
                <el-button type="primary" @click="saveAddCategory">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 标签 新增/编辑 弹出框 -->
        <el-dialog :title="formTitle" :visible.sync="labelVisible" width="380px" :before-close="dialogClose">
            <el-form ref="formBox" :model="labelForm" :rules="rules" label-width="90px">
                <el-form-item label="类别名称:" prop="name">
                    <el-input placeholder="请输入" autofocus="autofocus" v-model="labelForm.name"></el-input>
                </el-form-item>
                <el-form-item label="父级:" prop="parentsCategoryId" v-if="parentsCategoryShow">
                    <el-select v-model="labelForm.parentsCategoryId" placeholder="请选择" class="handle-select">
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
import './ProductLabel.less';
export default {
    name: 'productLabel',
    data() {
        return {
            pageInfo: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            loading: false,
            tableData: [],  // 列表数据
            categoryList: [],  // 分类列表
            labelList: [],// 标签列表
            labelVisible: false,       // 标签弹窗-新增编辑
            categoryVisible:false,     // 分类弹窗-新增
            pageTotal: 0,
            searchForm:{
                searchLabel:''
            },
            categoryForm:{
                name: ''
            },
            categoryRules: {
                name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
            },
            labelForm: {
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
            formTitle: '',
            selectedCategoryId: -1,
        };
    },
    created() {
    },
    mounted() {
        // 获取分类
        this.categoryList = [
            {id:-1,name:'全部'},
            {id:1,name:'材料'},
            {id:2,name:'颜色'},
            {id:3,name:'尺寸'},
            {id:11,name:'材料1'},
            {id:12,name:'颜色1'},
            {id:13,name:'尺寸1'},
            {id:21,name:'材料2'},
            {id:22,name:'颜色2'},
            {id:23,name:'尺寸2'},
            {id:31,name:'材料3'},
            {id:32,name:'颜色3'},
            {id:33,name:'尺寸3'},
        ];

        // 获取标签
        this.labelList = [
            {id:1,name:'红色',parentsCategoryId:2,parentsCategoryName:'颜色'},
            {id:2,name:'花色',parentsCategoryId:2,parentsCategoryName:'颜色'},
            {id:3,name:'纯色',parentsCategoryId:2,parentsCategoryName:'颜色'},
            {id:4,name:'棉布',parentsCategoryId:1,parentsCategoryName:'材料'},
            {id:5,name:'涤纶',parentsCategoryId:1,parentsCategoryName:'材料'},
            {id:6,name:'五尺',parentsCategoryId:3,parentsCategoryName:'尺寸'},
            {id:7,name:'三尺',parentsCategoryId:3,parentsCategoryName:'尺寸'},
        ]
        this.categoryOptions = [];
        // 大类列表
        this.categoryList.forEach((ev,i)=>{
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
                this.tableData = this.labelList;
                this.pageTotal = 5;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.pageInfo, 'pageIndex', 1);
            this.getData();
            // 搜索框是否有值， 当搜索框有值时 搜索成功后 ，分类显示到，当前搜索值所在分类
            // this.selectedCategoryId = ？？;
        },
        // 新增大类
        addCategory() {
            console.log('this.form', this.form);
            this.categoryVisible = true;
        },

        // 编辑标签
        editLabel(index, row) {
            // console.log('row', row);
            this.idx = index;
            this.formTitle = '编辑';
            this.parentsCategoryShow = true;
            this.labelVisible = true;
            this.$nextTick(()=> {
                // const new_obj = JSON.parse(JSON.stringify(row));
                const new_obj = {};
                new_obj['parentsCategoryId'] = this.selectedCategoryId;
                new_obj['name'] = row.name;
                console.log('new_obj', new_obj);
                // 触发更新
                this.labelForm = Object.assign({}, this.form,new_obj);
                // console.log('this.labelForm', this.labelForm);
            })
        },

        // 删除 标签操作
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

        // 新增标签
        addLabel( index, row) {
            this.parentsCategoryShow = true;
            this.formTitle = '新增标签';
            this.idx = index;
            this.labelVisible = true;
            this.$nextTick(()=>{
                const new_obj = {};
                new_obj['parentsCategoryId'] = this.selectedCategoryId;
                new_obj['name'] = '';
                console.log('new_obj', new_obj);
                // 触发更新
                this.labelForm = Object.assign({}, this.labelForm,new_obj);
            })
        },

        // 保存编辑
        saveEdit() {
            let request = {};
            this.$refs['formBox'].validate(valid => {
                if (valid) {
                    // 新增大类
                    if (this.formTitle === '新增标签') {
                        request = {
                            name: this.labelForm.name
                        };
                        console.log('request', request);
                        // ajax
                        // 请求成功  添加进列表 或者 刷新列表
                        const obj = {
                            id: 5,
                            name: this.labelForm.name,
                            is_first: true
                        }
                        // 请求失败
                    }else if(this.formTitle === '编辑'){
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
                        this.labelVisible = false;
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.$set(this.tableData[this.idx], 'name', this.labelForm.name);
                        // 刷新列表


                    }
                    console.log('this.idx', this.idx);
                    console.log('this.labelForm', this.labelForm);
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

        // 标签弹框关闭前操作
        dialogClose(){
            console.log('弹框关闭前操作');
            this.$refs['formBox'].resetFields();
            this.$refs['formBox'].clearValidate();
            this.labelVisible = false;
        },

        // 分类弹窗关闭前
        categoryClose(){
            this.$refs['categoryFormBox'].resetFields();
            this.$refs['categoryFormBox'].clearValidate();
            this.categoryVisible = false;
        },

        // 确定 添加分类
        saveAddCategory(){
            console.log('this.categoryForm.name', this.categoryForm.name);
            this.$refs['categoryFormBox'].validate(valid => {
                if (valid) {
                    const request ={
                        name:this.categoryForm.name
                    }
                    console.log('request1111', request);
                    // ajax
                    const new_obj = {
                        id : 5,
                        name: this.categoryForm.name
                    }
                    this.categoryList.push(new_obj);
                    // 重置分类下拉框数据
                    this.categoryOptions = [];
                    this.categoryList.forEach((ev,i)=>{
                        this.categoryOptions.push({
                            key: ev.id,
                            name: ev.name
                        })
                    });
                    this.categoryClose();
                    this.categoryVisible = false;
                }else {

                }
            })
        },

        // 选择分类
        selectCategory(id){
            this.selectedCategoryId = id;
            // 搜索请求
            // this.handleSearch();
        }

    }
};
</script>
