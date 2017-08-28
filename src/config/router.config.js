import Vue from 'vue'
import Router from 'vue-router'
import homepage from '@/page/home'
import expert from '@/page/expert'
import agent from '@/page/agent'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            component: homepage
        },
        {
            path: '/expert',
            component: expert
        },
        {
            path:'/agent',
            component:agent
        }
    ]
})