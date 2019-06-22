import { Module } from 'vuex';
import { DecklistState, RootState } from '@/types/state';
import { DECKLIST } from '@/store/actions';
import { Decklist } from '@/types/decklist';

export const module: Module<DecklistState, RootState> = {
  state: {
    decklist: new Decklist(),
  },
  getters: {},
  mutations: {
    [DECKLIST.ADD_CARD]: (state, card) => {
      state.decklist.addCard(card);
    },

    [DECKLIST.REMOVE_CARD]: (state, card) => {
      state.decklist.removeCard(card);
    },
  },
  actions: {
  },
};
