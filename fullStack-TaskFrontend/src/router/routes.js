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
      { path: 'performance-review', name: 'performanceReview.index', component: () => import('pages/PerformanceReivew/index.vue') },
      { path: 'feed-back-request', name: 'feedBackRequest.index', component: () => import('pages/FeedBackRequest/index.vue') },
      { path: 'users', name: 'user.index', component: () => import('pages/User/index.vue') }
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
