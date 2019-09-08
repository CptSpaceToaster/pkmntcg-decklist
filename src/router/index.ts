import Vue from 'vue';
import Router from 'vue-router';
import DecklistBuilder from '@/views/DecklistBuilder.vue';
import DecklistInspector from '@/views/DecklistInspector.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'builder' },
    },
    {
      name: 'builder',
      path: '/builder',
      component: DecklistBuilder,
      meta: {
        navigationTitle: 'Pokemon TCG Decklist Creator',
      },
    },
    {
      name: 'inspector',
      path: '/inspector',
      component: DecklistInspector,
      meta: {
        navigationTitle: 'Pokemon TCG Decklist Inspector',
      },
    },
    {
      path: '*',
      name: 'lost',
      redirect: { name: 'home' },
    },
  ],
});
