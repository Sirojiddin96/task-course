import { createWebHistory, createRouter } from 'vue-router'
import store from '../store'


const Home = () => import('../pages/home/HomePage.vue')
const Tasks = () => import('../pages/tasks/TaskList.vue')
const NotFound = () => import('../pages/not-found/NotFound.vue')

// MainLayout
const MainLayout = () => import('../layout/MainLayout.vue')

// Auth
const Auth = () => import('../layout/AuthLayout.vue')
const Login = () => import('../pages/auth/LoginPage.vue')

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: "MainLayout",
    children: [
      {
        path: '/home',
        name: "Home",
        component: Home,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/tasks',
        name: "Tasks",
        component: Tasks,
        requireAuth: true,
        meta: {
          isButton: true,
          requireAuth: true
        }
      },
      {
        path: '/members',
        name: "Members",
        component: () => import('../pages/members/MemberList.vue'),
        meta: {
          requireAuth: true
        }
      },
    ],
    component: MainLayout,
  },
  {
    path: '/auth',
    name: "Auth",
    redirect: '/auth/login',
    component: Auth,
    children: [
      {
        path: '/auth/login',
        name: "Login",
        component: Login,
        meta: {
          isGuest: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.state.token) {
    next({ name: 'Auth' });
  } else if (store.state.token && to.meta.isGuest) {
    next({ name: 'MainLayout' });
  } else {
    next();
  }
});


