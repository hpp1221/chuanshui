<template>
    <div>
        <div class="role-content">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>角色信息</span>
                </div>
            </div>
            <el-form
                ref="roleForm"
                :model="roleForm"
                label-width="80px"
                :inline="true"
                class="role-form"
                :rules="roleRules"
            >
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="roleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="address">
                    <el-input v-model="roleForm.address"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="role-content">
            <div class="global-table-title">
                <div class="title">
                    <i></i>
                    <span>权限分配</span>
                </div>
            </div>
            <Vue2OrgTree name="test" :data="data" :render-content="renderContent"/>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Vue2OrgTree from 'vue2-org-tree';
import 'vue2-org-tree/dist/style.css';
Vue.use(Vue2OrgTree);
import './RoleManagement.less';
import { Divider } from 'element-ui';
export default {
    name: 'OperationRoleModule',
    data() {
        return {
            roleForm: {},
            roleRules: {
                name: [
                    {
                        required: true,
                        message: '请输入'
                    }
                ],
                address: [
                    {
                        required: true,
                        message: '请输入'
                    }
                ]
            },
            data: {
                id: 0,
                label: 'XXX科技有限公司',
                children: [
                    {
                        id: 2,
                        label: '产品研发部',
                        children: [
                            {
                                id: 5,
                                label: '研发-前端'
                            },
                            {
                                id: 6,
                                label: '研发-后端'
                            },
                            {
                                id: 9,
                                label: 'UI设计'
                            },
                            {
                                id: 10,
                                label: '产品经理'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '销售部',
                        checked:true,
                        children: [
                            {
                                id: 7,
                                label: '销售一部'
                            },
                            {
                                id: 8,
                                label: '销售二部'
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: '财务部'
                    },
                    {
                        id: 9,
                        label: 'HR人事'
                    }
                ]
            },
            horizontal: false,
            collapsable: true,
            expandAll: false,
            labelClassName: 'bg-white'
        };
    },
    methods: {
        renderContent(h, data) {
            console.log('hhh',data.label,data);
            return <div><el-checkbox style="margin:0 8px 5px 0" v-model={data.checked}></el-checkbox><span>{data.label}</span></div>;
        }
    }
};
</script>
<style type="text/css">
.org-tree-node-label {
    white-space: nowrap;
}
.bg-white {
    background-color: white;
}
.bg-orange {
    background-color: orange;
}
.bg-gold {
    background-color: gold;
}
.bg-gray {
    background-color: gray;
}
.bg-lightpink {
    background-color: lightpink;
}
.bg-chocolate {
    background-color: chocolate;
}
.bg-tomato {
    background-color: tomato;
}
</style>