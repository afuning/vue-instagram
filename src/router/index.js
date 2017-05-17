import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main/Main';
import Container from '@/components/main/Container';
// import Hello from '@/components/Hello';
import Home from '@/components/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '',
          name: 'index',
          component: Home,
        },
        {
          path: ':id',
          name: 'mine',
          component: Home,
        },
      ],
    },
    {
      path: '/c',
      name: 'Container',
      component: Container,
      children: [
        {
          path: 'post/:id',
          name: 'post',
          component: Home,
        },
      ],
    },
  ],
});
