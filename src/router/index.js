import Vue from 'vue'
import VueRouter from 'vue-router'
import Food from '../views/food/Food'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/menu-food'},
        {path: '/menu-food', component: Food}
    ]
})