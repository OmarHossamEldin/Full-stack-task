const routes = [
  {
    path: '/', name: 'login', component: () => import('pages/Auth/login.vue')
  },
  {
    path: '/fullstack',
    name: 'fullstack',
    component: () => import('src/layouts/FullstaskPanel.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/index.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/Auth/profile.vue') },
      { path: 'categories', name: 'category', component: () => import('pages/Category/index.vue') },
       { path: 'admins', name: 'admin.index', component: () => import('pages/Admin/index.vue') },
      { path: 'admins/create', name: 'admin.create', component: () => import('pages/Admin/create.vue') },
      { path: 'admins/:id/edit', name: 'admin.edit', component: () => import('pages/Admin/edit.vue') },
     ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('src/pages/Error/Error404.vue')
  }
]

export default routes
