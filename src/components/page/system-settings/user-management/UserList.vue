<template>
    <div>
        <div class="container clearfix">
            <el-form :model="searchForm" :inline="true" ref="searchForm" label-width="80px">
                <el-form-item label="登录账户:" prop="account">
                    <el-input v-model="searchForm.account"></el-input>
                </el-form-item>
                <el-form-item label="角色名称:" prop="roleName">
                    <el-select v-model="searchForm.roleName" placeholder="请选择">
                        <el-option  v-for="state in roleNameOptions" :key="state.key" :value="state.key" :label="state.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态:" prop="userStatus">
                    <el-select v-model="searchForm.userStatus" placeholder="请选择">
                        <el-option  v-for="state in userStatusOptions" :key="state.key" :value="state.key" :label="state.name" />
                    </el-select>
                </el-form-item>
                <el-form-item><!-- class="btn-right margin-right0"-->
                    <div class="btn-right">
                        <!--<el-button @click="resetForm('searchForm')">重置</el-button>-->
                        <el-button type="primary" @click="handleSearch('searchForm')">搜索</el-button>
                        <el-button type="success" @click="addUser('add')">添加用户</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="container m-t-16 p-t-0">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>用户列表</span>
                </div>
            </div>
            <el-table v-loading="loading" :data="tableData" ref="multipleTable">
                <el-table-column prop="id" label="编号" width="75" align="center"></el-table-column>
                <el-table-column prop="user_name" label="用户名"></el-table-column>
                <el-table-column prop="nick_name" label="登录账户"></el-table-column>
                <el-table-column prop="role_id" label="角色名称">
                    <template scope="scope">
                        <span v-show="scope.row.role_id===0">普通用户</span>
                        <span v-show="scope.row.role_id===1">超级管理员</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="用户状态">
                    <template scope="scope">
                        <span class="status-ball" :class="scope.row.status===1?'color-success':'color-err'"></span>
                        <span v-if="scope.row.status===0" class="font-stop">停用</span>
                        <span v-if="scope.row.status===1" class="font-use">使用中</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone_no" label="手机号"></el-table-column>
                <el-table-column prop="role_id" label="是否超级管理员">
                    <template scope="scope">
                        <span v-show="scope.row.role_id===0">否</span>
                        <span v-show="scope.row.role_id===1">是</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                    <template scope="scope">
                        <el-tooltip placement="top" effect="light" popper-class="tooltip-remark">
                            <div slot="content" class="remark-box">
                                <div class="remark-title">备注</div>
                                <div class="remark-content">{{scope.row.remark}}</div>
                            </div>
                            <i class="el-icon-warning cursor-class"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="updated_time" label="最后登录时间"></el-table-column>
                <el-table-column prop="created_time" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" @click="changePassword(scope.$index, scope.row)">修改密码</el-button>
                        <el-button v-show="scope.row.status===1" type="text" @click="handleStop(scope.$index, scope.row)">停用</el-button>
                        <el-button v-show="scope.row.status===0" type="text" @click="handleEnable(scope.$index, scope.row)">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination pos-relative">
                <!--<div class="pos-absolute">
                    <el-button type="success" @click="addPage">打印标贴</el-button>
                </div>-->
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

        <!-- 添加新用户/编辑用户弹出框 -->
        <el-dialog :title="addOrEdit === 'add'?'添加新用户':'编辑'" :visible.sync="editVisible" width="640px" :destroy-on-close="true">
            <el-form ref="editForm" :rules="editFormRules" :model="editForm">
                <div class="form-content">
                    <div class="form-left">
                        <el-form-item label="用户名" prop="user_name">
                            <el-input v-model="editForm.user_name"></el-input>
                        </el-form-item>
                        <el-form-item v-if="addOrEdit === 'add'" label="密码" prop="password">
                            <el-input v-model="editForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="角色名称" prop="role_name">
                            <el-select v-model="editForm.role_name" placeholder="请选择">
                                <el-option  v-for="state in roleNameOptions" :key="state.key" :value="state.key" :label="state.name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否是超级会员" prop="is_super">
                            <el-select v-model="editForm.is_super" placeholder="请选择">
                                <el-option  v-for="state in isSuperOptions" :key="state.key" :value="state.key" :label="state.name" />
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form-right">
                        <el-form-item v-if="addOrEdit === 'add'" label="登录账号" prop="nick_name">
                            <el-input v-model="editForm.nick_name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone_no">
                            <el-input v-model="editForm.phone_no"></el-input>
                        </el-form-item>
                        <el-form-item label="状态选择" prop="status">
                            <el-select v-model="editForm.status" placeholder="请选择">
                                <el-option  v-for="state in userStatusOptions" :key="state.key" :value="state.key" :label="state.name" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark">
                            <el-input v-model="editForm.remark"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit('editForm')">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码弹出框 -->
        <el-dialog title="修改密码" :visible.sync="changePasswordVisible" width="300px" destroy-on-close="destroy-on-close">
            <el-form ref="changePasswordForm" :rules="changePasswordRules" :model="changePasswordForm">
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="changePasswordForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordSure">
                    <el-input v-model="changePasswordForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changePasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePassword">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api';
import './UserList.less';
export default {
    name: 'userList',
    data() {
        // 自定义手机号验证
        var checkMobile = (rule, value, callback) => {
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
            if (regMobile.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法的手机号"));
        };
        return {
            searchForm:{
                account:'',
                roleName:'',
                userStatus:''
            },
            pageInfo: {
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            addOrEdit:'', // 新增或者编辑用户
            loading: false,
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0, // 总条数
            editForm: {
                user_name:'',
                password:'',
                role_name:'',
                is_super:'',
                nick_name:'',
                phone_no:'',
                status: '',
                remark:''
            },
            editFormRules:{
                user_name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { max: 40, message: '请输入40位以内用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 64, message: '请输入6-64位密码', trigger: 'blur' }
                ],
                role_id: [
                    { required: true, message: '请输入角色名称', trigger: 'change' },
                ],
                is_super: [
                    { required: true, message: '请选择是否是超级管理员', trigger: 'change' },
                ],
                nick_name: [
                    { required: true, message: '请输入登录账号', trigger: 'blur' },
                ],
                phone_no: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {
                        validator: checkMobile,
                        trigger: "blur",
                    },
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' },
                ],
                remark: [
                    { required: true, message: '请填写备注', trigger: 'blur' },
                ],
            },
            idx: -1,
            id: -1,
            roleNameOptions: [],
            userStatusOptions: [],
            isSuperOptions:[
                { key: '1', name: '是' },
                { key: '0', name: '否' }
            ],
            tableData2: [
                {
                    "id": 1,
                    "user_name": "admin",
                    "nick_name": "admin",
                    "phone_no": "1314567890",
                    "remark": "我是备注我是备注我是备注我是备注",
                    "status": 1,
                    "role_id": 1,
                    "last_login_time": "2020-08-12 17:15:40",
                    "login_ip": "192.168.1.186",
                    "created_time": "2020-08-05 10:04:09",
                    "updated_time": "2020-08-06 15:16:41",
                    "role_name": "角色1"
                },
                {
                    "id": 2,
                    "user_name": "admin",
                    "nick_name": "admin",
                    "phone_no": "1314567890",
                    "remark": "我是备注我是备注我是备注我是备注",
                    "status": 0,
                    "role_id": 0,
                    "last_login_time": "2020-08-12 17:15:40",
                    "login_ip": "192.168.1.186",
                    "created_time": "2020-08-05 10:04:09",
                    "updated_time": "2020-08-06 15:16:41",
                    "role_name": "角色1"
                },{
                    "id": 3,
                    "user_name": "admin",
                    "nick_name": "admin",
                    "phone_no": "1314567890",
                    "remark": "我是备注我是备注我是备注我是备注",
                    "status": 0,
                    "role_id": 0,
                    "last_login_time": "2020-08-12 17:15:40",
                    "login_ip": "192.168.1.186",
                    "created_time": "2020-08-05 10:04:09",
                    "updated_time": "2020-08-06 15:16:41",
                    "role_name": "角色2"
                },
                {
                    "id": 9,
                    "user_name": "test",
                    "nick_name": "test2222",
                    "phone_no": "15381912895",
                    "remark": "我是备注我是备注我是备注我是备注",
                    "status": 1,
                    "role_id": 1,
                    "last_login_time": "1970-01-01 08:00:00",
                    "login_ip": "0.0.0.0",
                    "created_time": "2020-08-06 11:19:55",
                    "updated_time": "2020-08-06 11:21:35",
                    "role_name": "角色1"
                }
            ],
            operationalUserInfo:{},
            operationalUserId:'',
            operationalIndex:0,
            changePasswordVisible:false,   // 修改密码 弹窗是否显示
            changePasswordForm:{
                password:'',
                passwordSure:''
            },
            changePasswordRules:{
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 64, message: '请输入6-64位密码', trigger: 'blur' }
                ],
                passwordSure: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 64, message: '请输入6-64位密码', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.getData();
        this.roleNameOptions = [
            { key: '1', name: '角色1' },
            { key: '2', name: '角色2' }
        ];
        this.userStatusOptions = [
            { key: '1', name: '启用' },
            { key: '2', name: '停用' }
        ];
    },
    mounted() {

    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.pageInfo).then(res => {
                console.log(res);
                // this.tableData = res.list;
                // this.pageTotal = res.pageTotal || 50;
                this.tableData = this.tableData2;
                this.pageTotal = 2;
            });
        },

        // 触发搜索按钮
        handleSearch(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.searchForm;
                    console.log('params', params);
                    //ajax`
                } else {
                    return false;
                }
            });
            this.$set(this.pageInfo, 'pageIndex', 1);
            this.getData();
        },
        addPage() {
            // this.$route.query
            this.$router.push({ path: '/test', query: { pid: '1' } });
        },
        testPage() {
            // this.$route.pageInfo
            this.$router.push({ path: '/test', query: { pid: '2' } });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.addOrEdit = 'edit';
            this.idx = index;
            this.editForm = Object.assign({}, row);
            if(row.status > 0){
                this.editForm.status = '1';
            }else {
                this.editForm.status = '2';
            }
            if(row.role_name === '超级管理员'){
                this.editForm.is_super = '1';
            }else {
                this.editForm.is_super = '0';
            }
            this.editForm.role_id = row.role_id.toString();
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = this.editForm;
                    console.log('params', params);
                    //ajax`
                } else {
                    alert('验证失败')
                    return false;
                }
            });
            // this.editVisible = false;
            // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            // this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            this.getData();
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 添加用户
        addUser(){
            this.addOrEdit = 'add';
            this.$nextTick(() => {
                this.$refs['editForm'].resetFields();
            });
            this.editVisible = true;
        },
        //  启用操作
        handleEnable(index, row){
            this.operationalUserId = row.id;
            this.operationalIndex = index;
            this.changeUserStatus();
        },
        // 停用操作
        handleStop(index, row) {
            // 二次确认删除
            this.$confirm('确定要停用该用户吗？', '', {
                customClass: 'message-delete',
                type: 'warning',
                center: true
            })
                .then(() => {
                    this.changeUserStatus();
                    // this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 改变用户使用状态
        changeUserStatus(){
            // ajax
            // this.$message.success('停用成功');
            console.log('this.tableData', this.tableData[this.operationalIndex].status);
            let newStatus = 0;
            if(this.tableData[this.operationalIndex].status === 0){
                newStatus = 1
            }
            this.$set(this.tableData[this.operationalIndex], 'status', newStatus);
        },
        // 修改密码
        changePassword(index,row){
            this.operationalIndex = index;
            this.operationalUserInfo = row;
            this.changePasswordVisible = true;
            // this.$refs['changePasswordForm'].resetFields();
        },
        savePassword(){
            this.changePasswordVisible = false;
        },

    }
};
</script>
