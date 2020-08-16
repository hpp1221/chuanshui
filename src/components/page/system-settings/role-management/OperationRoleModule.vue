<template>
    <div>
        <div class="container clearfix">
            <div class="handle-box">
              <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>权限管理</span>
                </div>
                <el-button type="primary" @click="handleCreateAuthority">新建权限</el-button>
            </div>
            </div>
        </div>
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'OperationRoleModule',
    data() {
        return {};
    },
    methods: {}
};
</script>