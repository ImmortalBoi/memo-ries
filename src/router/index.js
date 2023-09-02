import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from '../store'

import MemoHomeView from '../views/Memo/MemoHomeView.vue'
import NewMemoView from '@/views/Memo/NewMemoView.vue'
import MemoView from '@/views/Memo/MemoView.vue'
import MemoEditView from '@/views/Memo/MemoEditView.vue'

import MemoryHomeView from '../views/Memory/MemoryHomeView.vue'
import MemoryEditView from '@/views/Memory/MemoryEditView.vue'
import NewMemoryView from '@/views/Memory/NewMemoryView.vue'
import MemoryView from '@/views/Memory/MemoryView.vue'

import BookmarksView from '../views/BookmarksView.vue'
import AboutView from '../views/AboutView.vue'
import LogInView from '../views/LogInView.vue'
import SignUpView from '../views/SignUpView.vue'

const routes = [
  {
    path: '/memos',
    name: 'memos',
    component: MemoHomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/newMemo',
    name: 'memoNew',
    component: NewMemoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memos/:id',
    name: 'memo',
    component: MemoView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memos/:id/edit',
    name: 'memoEdit',
    component: MemoEditView,
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'memories',
    component: MemoryHomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/newMemory',
    name: 'newMemory',
    component: NewMemoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memories/:id',
    name: 'memory',
    component: MemoryView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memories/:id/edit',
    name: 'memoryEdit',
    component: MemoryEditView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/bookmarks',
    name: 'bookmarks',
    component: BookmarksView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to) => {
  // console.log("envoked")
  // console.log("session validity:",!(sessionStorage.getItem('correctUser')==="true"))
  // console.log("redirect avoidance:",to.name !== 'login')
  
  if (
    // make sure the user is authenticated
    // !(sessionStorage.getItem('correctUser')==="true") &&
    (store.loggedIn == false) &&
    // ❗️ Avoid an infinite redirect
    (to.name !== 'login') &&
    (to.name !== 'signup') 
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})


export default router
