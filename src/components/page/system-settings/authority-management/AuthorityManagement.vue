<template>
    <div>
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
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            <!-- 权限新建和编辑弹出框 -->
            <el-dialog
                :title="authorityForm.status === 'addAuth' ? '新建权限':
                authorityForm.status === 'editAuth' ? '编辑权限':'新建下级'"
                :visible.sync="authorityForm.visible"
                width="30%"
            >
                <el-form ref="authorityForm" :model="authorityForm" :rules="authorityFormRules">
                    <el-form-item label="父类" prop="parentClass">
                        <el-select
                            v-model="authorityForm.parentClass"
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
                    rouer: '',
                    authorityName: ''
                }
            },
            authorityFormRules: {
                parentClass: [
                    {
                        required: true,
                        message: '请选择',
                        trigger: 'blur'
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
            console.log('index', index, row);
            this.authorityForm = Object.assign({}, this.authorityForm, { currentItem: row, visible: true, status: 'editAuth' });
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$set(this.authorityForm, 'visible', false);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
