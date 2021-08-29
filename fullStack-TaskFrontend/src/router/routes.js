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
      { path: 'performance-reviews', name: 'performanceReview.index', component: () => import('pages/PerformanceReview/index.vue') },
      { path: 'feed-back-requests', name: 'feedBackRequest.index', component: () => import('pages/FeedBackRequest/index.vue') },
      { path: 'users', name: 'user.index', component: () => import('pages/User/index.vue') }
     ]
  },
  {
    path: '*',
    component: () => import('src/pages/Error/Error404.vue')
  }
]

export default routes
