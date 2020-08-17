import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/product-list',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/cargo-management/product-list/ProductList.vue'),
                    meta: { title: '产品列表' }
                },
                {
                    path: '/product-category',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/cargo-management/product-category/ProductCategory.vue'),
                    meta: { title: '产品分类' }
                },
                {
                    path: '/product-label',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/cargo-management/product-label/ProductLabel.vue'),
                    meta: { title: '产品标签' }
                },
                {
                    path: '/shelf-list',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/shelf-management/shelf-list/ShelfList.vue'),
                    meta: { title: '货架列表' }
                },
                {
                    path: '/order-list',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/order-management/order-list/OrderList.vue'),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/user-list',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/system-settings/user-management/UserList.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/parameter-configuration',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/system-settings/parameter-configuration/ParameterConfiguration'),
                    meta: { title: '参数配置' }
                },
                {
                    path: '/authority-management',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/system-settings/authority-management/AuthorityManagement'),
                    meta: { title: '权限管理' }
                },
                {
                    path: '/role-management',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/system-settings/role-management/RoleManagement'),
                    meta: { title: '角色管理' }
                },
                {
                    path:'/add-role',
                    component: () =>
                        import(/* webpackChunkName: "table" */ '../components/page/system-settings/role-management/OperationRoleModule'),
                    meta: { title: '新建角色' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                },
                {
                    path: '/test',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/test.vue'),
                    meta: { title: '测试' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
