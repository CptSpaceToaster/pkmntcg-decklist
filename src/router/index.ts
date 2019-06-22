import Decklist from '@/views/Decklist.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'decklist' },
    },
    {
      name: 'decklist',
      path: '/decklist',
      component: Decklist,
    },
  ],
});
