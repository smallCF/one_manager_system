import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import Table from '@/components/common/BaseTable'
import Tabs from '@/components/common/Tabs'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/index',
            redirect: '/table'
        }, {
            path: '/index',
            component: Index,
            meta: { title: '系统首页' },
            children: [{
                path: '/table',
                component: Table,
                meta: { title: '基础表格' }
            }, {
                path: '/tabs',
                component: Tabs,
                meta: { title: '选项卡' }
            }]
        },
        {
            path: '/',
            component: Login,
            meta: { title: '登录' }
        }
    ]
})