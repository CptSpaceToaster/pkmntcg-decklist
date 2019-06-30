import Vue from 'vue';
import Router from 'vue-router';
import DecklistBuilder from '@/views/DecklistBuilder.vue';

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
      component: DecklistBuilder,
      meta: {
        navigationTitle: 'Pokemon TCG Decklist Creator',
      },
    },
  ],
});
