import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('@/layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/CoursesCenter.vue'),
          meta:{
            auth:true

          }
        },

        {
          path: 'save',
          name: 'save',
          component: () => import('@/views/SaveView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta:{
            auth:false
          }
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'community',
          name: 'community',
          component: () => import('@/views/CommunityView.vue'),
          meta:{
            auth:true
          }
        },
        {
          path: 'chat',
          name: 'chat',
          component: () => import('@/views/ChatView.vue'),
          children:[
            {
              path: ':id',
              name: 'chatroom',
              component: () => import('@/views/ChatDetailView.vue'),
              props:true
            }
          ],
          meta:{
            auth:true
          }
        },
        {
          path: 'post',
          name: 'post',
          component: () => import('@/views/Post.vue'),
          meta:{
            auth:true

          }
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/layout/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
          meta:{
            auth:false
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta:{
            auth:false
          }
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import('@/views/ResetView.vue'),
          meta:{
            auth:false
          }
        },
      ],
    },
  ],
});

router.beforeEach((to,from,next)=>{
  if(to.meta.auth){
    if(localStorage.getItem('token')){
      next();
    }else{
      next('/auth/login');
    }
  }else{
    next();
  }
})

export default router;
