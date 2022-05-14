import {createRouter,createWebHistory} from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Survey from '../views/Survey.vue'


const routes = [
    {
        path:'/',
        name: 'Homepage',
        component: Homepage,
    },
    {
        path:'/Survey',
        name: 'Survey',
        component: Survey,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router