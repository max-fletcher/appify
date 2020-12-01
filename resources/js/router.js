import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import firstPage from './components/pages/myFirstVuePage'
import SomeOtherRoute from './components/pages/SomeOtherRoute'
import Hooks from './components/pages/basic/hooks'
import Methods from './components/pages/basic/methods'

//project pages
import Home from './components/pages/home'
import Tags from './admin/pages/tags'
import Category from './admin/pages/category'


const routes = [{

        // Projects Routes........

        path: '/',
        component: Home
    },
    {
        path: '/tags',
        component: Tags
    },
    {
        path: '/category',
        component: Category
    },



    //Basics
    {
        path: '/some-other-route',
        component: SomeOtherRoute
    },

    //Vue Hooks
    {
        path: '/hooks',
        component: Hooks
    },

    //Methods
    {
        path: '/methods',
        component: Methods
    },

]

export default new Router({
    mode: 'history',
    routes
})