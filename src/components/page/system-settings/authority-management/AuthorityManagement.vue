<!--
<template>
<<<<<<< HEAD
    <div class="author-container">
=======
    <div>
>>>>>>> 3c37f1af5e4cecef7b9a8a948fc2a793a746403e
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>权限管理</span>
                </div>
                <el-button type="primary" @click="handleCreateAuthority">新建权限</el-button>
            </div>
            <el-table
                :data="tableData"
                v-loading="loading"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column prop="authorityName" label="权限名称">
                    <template slot-scope="scope">
                        <span v-if="!scope.row.children" class="child-line">|</span>
                        <span
                            v-if="!scope.row.children"
                            class="child-line"
                            style="marginRight:10px"
                        >————————</span>
                        <span>{{scope.row.authorityName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="别名"></el-table-column>
                <el-table-column prop="router" label="路由"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            v-if="scope.row.children"
                            @click="handleCreateChildNode(scope.$index, scope.row)"
                        >新建下级</el-button>
<<<<<<< HEAD
                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
=======
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
>>>>>>> 3c37f1af5e4cecef7b9a8a948fc2a793a746403e
                        <el-button
                            type="text"
                            class="delete-color"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="pageInfo.pageIndex"
                    :page-size="pageInfo.pageSize"
                    :total="pageInfo.pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            &lt;!&ndash; 权限新建和编辑弹出框 &ndash;&gt;
            <el-dialog
                :title="authorityForm.status === 'addAuth' ? '新建权限':
                authorityForm.status === 'editAuth' ? '编辑权限':'新建下级'"
                :visible.sync="authorityForm.visible"
                :before-close="dialogClose"
                width="30%"
            >
<<<<<<< HEAD
                <el-form
                    ref="authorityForm"
                    :model="authorityForm.currentItem"
                    :rules="authorityFormRules"
                >
                    <el-form-item label="父类" prop="parentClass" v-if=" (authorityForm.status === 'addChild')|| (authorityForm.status === 'editAuth' && authorityForm.currentItem.level !== 1)">
=======
                <el-form ref="authorityForm" :model="authorityForm.currentItem" :rules="authorityFormRules">
                    <el-form-item label="父类" prop="parentClass">
>>>>>>> 3c37f1af5e4cecef7b9a8a948fc2a793a746403e
                        <el-select
                            v-model="authorityForm.currentItem.parentClass"
                            placeholder="请选择"
                            style="width:100%"
                        >
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="别名" prop="name">
                        <el-input v-model="authorityForm.currentItem.name" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="路由" prop="router">
                        <el-input v-model="authorityForm.currentItem.router" placeholder="请输入"></el-input>
                        <span class="router-message">如果是路由要绝对路径哦,例如/main/index</span>
                    </el-form-item>

                    <el-form-item label="权限名称" prop="authorityName">
                        <el-input
                            v-model="authorityForm.currentItem.authorityName"
                            placeholder="请输入"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="authorityForm.visible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSureAuthorityModal('authorityForm')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import './AuthorityManagement.less';

export default {
    name: 'AuthorityManagement',
    data() {
        return {
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 10
            },
            tableData: [
                {
                    id: 1,
                    authorityName: '系统设置',
                    name: 'menu',
                    router: '/author/index',
                    level: 1,
                    children: [
                        {
                            id: 31,
                            authorityName: '系统设置',
                            name: 'menu',
                            router: '/author/index'
                        },
                        {
                            id: 32,
                            authorityName: '系统设置',
                            name: 'menu',
                            router: '/author/index'
                        }
                    ]
                },
                {
                    id: 2,
                    authorityName: '系统设置1',
                    name: 'menu',
                    router: '/author/index',
                    level: 1,
                    children: [
                        {
                            id: 33,
                            authorityName: '系统设置',
                            name: 'menu',
                            router: '/author/index',
                            children: [
                                {
                                    id: 35,
                                    authorityName: '系统设置999',
                                    name: 'menu',
                                    router: '/author/index'
                                },
                                {
                                    id: 36,
                                    authorityName: '系统设置888',
                                    name: 'menu',
                                    router: '/author/index'
                                }
                            ]
                        },
                        {
                            id: 34,
                            authorityName: '系统设置',
                            name: 'menu',
                            router: '/author/index'
                        }
                    ]
                }
            ],
            loading: false,
            authorityForm: {
                visible: false,
                status: 'addAuth',
                currentItem: {
                    parentClass: '',
                    name: '',
                    router: '',
                    authorityName: '',
                    level:''
                }
            },
            authorityFormRules: {
                parentClass: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'change' 
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入',
                        trigger: 'blur' 
                    }
                ],
                router: [
                    {
                        required: true,
                        message: '请输入',
                        trigger: 'blur' 
                    }
                ],
                authorityName: [
                    {
                        required: true,
                        message: '请输入',
                        trigger: 'blur' 
                    }
                ]
            }
        };
    },
    methods: {
        //新建权限
        handleCreateAuthority() {
            this.$set(this.authorityForm, 'visible', true);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            // this.getData();
        },
        //新建下级
        handleCreateChildNode(index, row) {
            console.log('index', index, row);
            this.authorityForm = Object.assign({}, this.authorityForm, {
                currentItem: { parentClass: row.parentClass, name: '', rouer: '', authorityName: '' },
                visible: true,
                status: 'addChild'
            });
        },
        //编辑
        handleEdit(index, row) {
            console.log('index-edit', index, row);
            this.$set(this.authorityForm,'visible',true);
            this.$nextTick(()=>{
                this.authorityForm = Object.assign({}, this.authorityForm, { currentItem: row, visible: true, status: 'editAuth' });
            })

        },
        //删除
        handleDelete(index, row) {
            this.$confirm('确认要删除该条权限吗？', '', {
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
        //权限新建和编辑弹窗确定
        handleSureAuthorityModal(formName) {
            console.log('er',formName,this.authorityForm)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$set(this.authorityForm, 'visible', false);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
<<<<<<< HEAD
        // 弹框关闭前操作
        dialogClose(){
            console.log('弹框关闭前操作');
            this.$refs['authorityForm'].resetFields();
            this.$refs['authorityForm'].clearValidate();
            this.authorityForm.visible  = false;
        }
=======
>>>>>>> 3c37f1af5e4cecef7b9a8a948fc2a793a746403e
    }
};
</script>
-->

<template>
    <div class="author-container">
        <div class="container p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>权限管理</span>
                </div>
                <el-button type="primary" @click="handleCreateAuthority">新建权限</el-button>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    lazy
                    :row-key="getRowKeys"
                    :expand-row-keys="expands"
                    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
                <el-table-column label="权限名称" prop="display_name">
                    <template slot-scope="scope">
                        <span v-if="scope.row.level !== 1" class="child-line marginRight10">|————————</span>
                        <span>{{scope.row.display_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="别名"></el-table-column>
                <el-table-column prop="route_url" label="路由"></el-table-column>
                <el-table-column label="操作" width="200" align="left">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                class="m-r-20"
                                v-show="scope.row.children"
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
            <el-form ref="formBox" :model="form" :rules="rules">
<!--                <el-form-item label="别名:" prop="name">-->
<!--                    <el-input placeholder="请输入" autofocus="autofocus" v-model="form.name"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="父级:" prop="pid" v-if="parentsCategoryShow">
                    <el-select v-model="form.pid" placeholder="请选择" class="handle-select">
                        <el-option v-for="state in categoryOptions" :key="state.key" :value="state.key" :label="state.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="别名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="路由" prop="route_url">
                    <el-input v-model="form.route_url" placeholder="请输入"></el-input>
                    <span class="router-message">如果是路由要绝对路径哦,例如/main/index</span>
                </el-form-item>

                <el-form-item label="权限名称" prop="display_name">
                    <el-input
                            v-model="form.display_name"
                            placeholder="请输入"
                    ></el-input>
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
    import './AuthorityManagement.less';
    export default {
        name: 'AuthorityManagement',
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
                    pid:'',
                    route_url:'',
                    display_name:''
                },
                rules: {
                    pid: [{ required: true, message: '请选择父级', trigger: 'change' }],
                    name: [{ required: true, message: '请输入别名', trigger: 'blur' }],
                    route_url: [{ required: true, message: '请输入路由', trigger: 'blur' }],
                    display_name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }]
                },
                parentsCategoryShow:false,  // 弹框内 父级分类 是否显示
                idx: -1,
                id: -1,
                categoryOptions: [],
                parentsCategory: '',
                list1: [],
                formTitle: '',
                getRowKeys(row) {
                    return row.id;
                },
                expands: [],
                data2:[
                    {
                        id: 1,
                        name: "menu_sys",
                        display_name: "系统设置",
                        pid: 0,
                        level: 1,
                        route_url: ""
                    },
                    {
                        id: 2,
                        name: "menu_sys_user_list",
                        display_name: "用户列表",
                        pid: 1,
                        level: 2,
                        route_url: "/backend/user-list"
                    },
                    {
                        id: 3,
                        name: "menu_sys_role_list",
                        display_name: "角色列表",
                        pid: 1,
                        level: 2,
                        route_url: "/backend/role-list"
                    },
                    {
                        id: 4,
                        name: "menu_sys_permission_list",
                        display_name: "权限列表",
                        pid: 1,
                        level: 2,
                        route_url: "/backend/permission-list"
                    },
                    {
                        id: 5,
                        name: "menu_sys_user_create",
                        display_name: "用户添加",
                        pid: 2,
                        level: 3,
                        route_url: "/backend/user-create"
                    },
                    {
                        id: 6,
                        name: "menu_sys_config_list",
                        display_name: "参数配置",
                        pid: 1,
                        level: 2,
                        route_url: "/backend/config-list"
                    }]
            };
        },
        created() {
            // 处理数据
            this.processData(this.data2);
        },
        mounted() {
            // this.MissionTemplateForm.category = this.categoryOptions[0].name;
            this.list1 = [
                {
                id: 1,
                authorityName: '系统设置',
                name: 'menu',
                router: '/author/index',
                is_first: true,
                children: [
                    {
                        id: 11,
                        authorityName: '用户管理',
                        name: 'menu',
                        router: '/author/index',
                        is_second: true,
                        parentsCategoryName:'工具',
                        parentsCategoryId:1,
                    },
                    {
                        id: 12,
                        authorityName: '系统设置',
                        name: 'menu',
                        router: '/author/index',
                        is_second: true,
                        parentsCategoryName:'工具',
                        parentsCategoryId:1,
                    },
                    {
                        id: 13,
                        authorityName: '系统设置',
                        name: 'menu',
                        router: '/author/index',
                        is_second: true,
                        parentsCategory:'工具',
                        parentsCategoryName:1,
                    }
                ]
            },
                {
                    id: 4,
                    authorityName: '系统设置',
                    name: 'menu',
                    router: '/author/index',
                    is_first: true,
                    children:[]
                }];
            // 控制对应id 行 展开
            // this.expands.push('1');

            this.getData();
        },
        methods: {
            // 处理数据
            processData(data){
                console.log('处理数据');

                let dealOptions = []
                // 给每个数据加children属性
                data.forEach((ev, one) => {
                    ev.children = []
                })
                data.forEach((ev, one) => {
                    let findIndex = data.findIndex( (item) => item.id === ev.pid)
                    if ((!ev.pid && ev.pid !== 0 && ev.pid !== false) || findIndex === -1) {
                        dealOptions.push(ev)
                    } else {
                        data[findIndex].children.push(ev)
                    }
                })
                console.log('dealOptions', dealOptions);
                this.tableData = dealOptions;
                // 父级下拉框数据
                dealOptions.forEach((ev,i)=>{
                    this.categoryOptions.push({
                        key: ev.id,
                        name: ev.display_name
                    })
                });
                console.log('this.categoryOptions', this.categoryOptions);
                return dealOptions
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                fetchData(this.pageInfo).then(res => {
                    console.log(res);
                    // this.tableData = res.list;
                    // this.pageTotal = res.pageTotal || 50;
                    // this.tableData = this.list1;
                    this.pageTotal = 5;
                });
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.pageInfo, 'pageIndex', 1);
                this.getData();
            },
            // 新增权限
            handleCreateAuthority() {
                this.formTitle = '新增权限';
                console.log('this.form', this.form);
                this.editVisible = true;
            },
            // 编辑权限/编辑下级
            editFirstCategory(index, row) {
                console.log('row', row);
                console.log('this.categoryOptions', this.categoryOptions);
                // this.$refs['formBox'].clearValidate();
                this.idx = index;

                if (row.level > 1) {
                    this.formTitle = '编辑下级';
                    this.parentsCategoryShow = true;
                } else {
                    this.formTitle = '编辑权限';
                    this.parentsCategoryShow = false;
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
                    // const new_obj = JSON.parse(JSON.stringify(row));
                    const new_obj = {};
                    new_obj['pid'] = row.pid;
                    // new_obj['name'] = '';
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
                        // 新增权限
                        if (this.formTitle === '新增权限') {
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

                        }else if(this.formTitle === '编辑权限'){
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
                this.$refs['formBox'].clearValidate();
                this.$refs['formBox'].resetFields();
                this.editVisible = false;
            }

        }
    };
</script>


