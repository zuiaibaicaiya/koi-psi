import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router"

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../AppLayout/index.vue'),
        redirect: '/home',
        meta: {
            title: 'Koi-PSI-首页'
        },
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import('../view/home/index.vue'),
                meta: {
                    title: 'Koi-PSI-首页'
                },
            },
            {
                path: '/admin',
                name: 'Admin',
                component: () => import('../view/admin/index.vue'),
                meta: {
                    title: 'Koi-PSI-管理员管理'
                },
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Koi-PSI-用户登录'
        },
        component: () => import('../view/login/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, _, next) => {
    const token = localStorage.getItem('token')
    document.title = to.meta.title as string
    if (!token) {
        if (to.path !== '/login') {
            next({path: '/login', replace: true})
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next({path: '/', replace: true})
        } else {
            next()
        }
    }
})
export default router