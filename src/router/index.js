import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/categories',
    component: Layout,
    redirect: '/',
    name: 'Xử lý chính',
    children: [
      {
        path: '',
        name: 'category_index',
        component: () => import('@/views/categories/index'),
        meta: { title: 'Danh mục', icon: 'el-icon-menu' }
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'category_edit',
        component: () => import('@/views/categories/edit'),
        meta: { title: 'Cập nhật danh mục' },
        hidden: true
      },
      {
        path: 'create',
        name: 'category_create',
        component: () => import('@/views/categories/create'),
        meta: { title: 'Tạo mới danh mục' },
        hidden: true
      }
    ]
  },
  {
    path: '/coupons',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'coupons_index',
        component: () => import('@/views/coupons/index'),
        meta: { title: 'Mã giảm giá', icon: 'el-icon-s-ticket' }
      }
    ]
  },
  {
    path: '/product_discounts',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'product_discounts_index',
        component: () => import('@/views/product_discounts/index'),
        meta: { title: 'Sản phẩm giảm giá', icon: 'el-icon-s-marketing' }
      },
      {
        path: 'create',
        name: 'product_discounts_create',
        component: () => import('@/views/product_discounts/create'),
        meta: { title: 'Sản phẩm giảm giá' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'product_discounts_edit',
        component: () => import('@/views/product_discounts/edit'),
        meta: { title: 'Sản phẩm giảm giá' },
        hidden: true
      }
    ]
  },
  {
    path: '/products',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'products_index',
        component: () => import('@/views/products/index'),
        meta: { title: 'Sản phẩm', icon: 'el-icon-fork-spoon' }
      },
      {
        path: 'create',
        name: 'products_create',
        component: () => import('@/views/products/create'),
        meta: { title: 'Tạo mới sản phẩm' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        name: 'products_edit',
        component: () => import('@/views/products/edit'),
        meta: { title: 'Chỉnh sửa sản phẩm' },
        hidden: true
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'orders_index',
        component: () => import('@/views/orders/index'),
        meta: { title: 'Quản lí order', icon: 'el-icon-s-order' }
      }
    ]
  },
  {
    path: '/comments',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'comment_index',
        component: () => import('@/views/comments/index'),
        meta: { title: 'Quản lý bình luận', icon: 'el-icon-s-comment' }
      }
    ]
  },
  {
    path: '/tele-sales',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'tele_sale_index',
        component: () => import('@/views/tele_sales/index'),
        meta: { title: 'Dành cho tele sale', icon: 'el-icon-phone-outline' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'setting_index',
        component: () => import('@/views/settings/index'),
        meta: { title: 'Cài đặt', icon: 'el-icon-setting' }
      }
    ]
  },
  { path: '401', name: '401', redirect: '/404', hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
