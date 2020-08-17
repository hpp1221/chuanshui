<template>
    <div>
        <div class="container m-t-16 p-t-0 role-container">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>参数配置</span>
                </div>
                <el-button type="primary" @click="handleCreateRole">新建角色</el-button>
            </div>

            <el-table v-loading="loading" :data="tableData" ref="multipleTable">
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="desc" label="描述"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleSave(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            type="text"
                            class="on-out"
                            @click="handleOnOrOut(scope.$index, scope.row)"
                        >停用</el-button>
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
        </div>
    </div>
</template>
<script>
import './RoleManagement.less';
import { fetchData } from '../../../../api';
export default {
    name: 'RoleManagement',
    data() {
        return {
            tableData: [
                {
                    code: 1,
                    roleName: '名称1',
                    desc: '描述1'
                },
                {
                    code: 2,
                    roleName: '名称2',
                    desc: '描述2'
                }
            ],
            loading: false,
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
                pageTotal: 10
            }
        };
    },
    methods: {
        //编辑操作
        handleEdit(index, row) {
            console.log('index', index, row);
        },
        //停用或启用
        handleOnOrOut() {},
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
        //新建角色
        handleCreateRole() {
            this.$router.push({path: '/add-role', query: { pid: '1' }});
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.pageInfo, 'pageIndex', val);
            // this.getData();
        }
    }
};
</script>