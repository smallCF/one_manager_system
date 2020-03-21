/*
 * @Author: GOOGOLX
 * @Date: 2020-03-01 15:27:58
 * @LastEditors: GOOGOLX
 * @LastEditTime: 2020-03-15 13:57:23
 * @Description: 
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Index from '@/components/index/index'
import Table from '@/components/common/BaseTable'
import Tabs from '@/components/common/Tabs'
import Order from '@/components/common/order'
import Winner from '@/components/common/winner'
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
                meta: { title: '用户管理' }
            }, {
                path: '/tabs',
                component: Tabs,
                meta: { title: '商品管理' }
            }, {
                path: '/order',
                component: Order,
                meta: { title: '订单管理' }
            }, {
                path: '/winner',
                component: Winner,
                meta: { title: '中奖管理' }
            }]
        },
        {
            path: '/',
            component: Login,
            meta: { title: '登录' }
        }
    ]
})