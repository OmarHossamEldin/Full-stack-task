const routes = [
  {
    path: '/', name: 'login', component: () => import('pages/Auth/login.vue')
  },
  {
    path: '/admin',
    name: 'adminPanel',
    component: () => import('layouts/AdminPanel.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/index.vue') },
      { path: 'profile', name: 'profile', component: () => import('pages/Auth/profile.vue') },
      { path: 'categories', name: 'category', component: () => import('pages/Category/index.vue') },
      { path: 'attributes', name: 'attribute', component: () => import('pages/Attribute/index.vue') },
      { path: 'attributes/:id', name: 'attribute.category', component: () => import('pages/Attribute/attribute-categories.vue') },
      { path: 'products', name: 'product', component: () => import('pages/Product/index.vue') },
      { path: 'products/create', name: 'product.create', component: () => import('pages/Product/create.vue')},
      { path: 'products/:id', name: 'product.show', component: () => import('pages/Product/show.vue') },
      { path: 'products/:id/edit', name: 'product.edit', component: () => import('pages/Product/edit.vue') },
      { path: 'sellers', name: 'seller', component: () => import('pages/Seller/index.vue') },
      { path: 'clients', name: 'client', component: () => import('pages/Client/index.vue') },
      { path: 'inbox', name: 'inbox', component: () => import('pages/Email/index.vue') },
      { path: 'subscribers', name: 'subscriber', component: () => import('pages/Subscriber/index.vue') },
      { path: 'admins', name: 'admin.index', component: () => import('pages/Admin/index.vue') },
      { path: 'admins/create', name: 'admin.create', component: () => import('pages/Admin/create.vue') },
      { path: 'admins/:id/edit', name: 'admin.edit', component: () => import('pages/Admin/edit.vue') },
      { path: 'roles', name: 'role.index', component: () => import('src/pages/Role/index.vue') },
      { path: 'roles/create', name: 'role.create', component: () => import('src/pages/Role/create.vue') },
      { path: 'roles/:id/edit', name: 'role.edit', component: () => import('src/pages/Role/edit.vue') },
      { path: 'permissions', name: 'permission', component: () => import('pages/Admin/permissions.vue') },
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
