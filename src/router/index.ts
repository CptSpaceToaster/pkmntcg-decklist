import Vue from 'vue';
import Router from 'vue-router';
import DecklistBuilder from '@/views/DecklistBuilder.vue';
import DecklistInspector from '@/views/DecklistInspector.vue';

import store from '@/store';
import { MODAL } from '@/store/actions';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if (to.query.card !== undefined) {
    store.dispatch(MODAL.LOAD_CARD_INFO, to.query.card);
  }
  store.commit(MODAL.SHOW_CARD_INFO, to.query.card !== undefined);
  next();
});

export default router;
